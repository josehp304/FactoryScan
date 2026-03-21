import { Router } from 'express';
import multer from 'multer';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { extractQRCode } from '../utils/qrExtraction.js';
import { db } from '../db/index.js';
import { physicalIds, verificationLogs } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import Tesseract from 'tesseract.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/v1/id/generate
router.post('/generate', async (req, res) => {
  try {
    const { name, course, student_id, expiry } = req.body;

    if (!name || !student_id) {
      return res.status(400).json({ success: false, error: 'Name and student_id are required' });
    }

    // Check if user already exists
    let existingRecord = await db.select().from(physicalIds).where(eq(physicalIds.student_id, student_id)).limit(1);
    
    let signedToken;
    let dbRecord;

    if (existingRecord.length > 0) {
      dbRecord = existingRecord[0];
      // Update existing record
      await db.update(physicalIds)
        .set({ name, course, expiry, updated_at: new Date() })
        .where(eq(physicalIds.id, dbRecord.id));
      
      signedToken = dbRecord.signed_token;
    } else {
      // Create new record
      signedToken = uuidv4();
      const [newRecord] = await db.insert(physicalIds).values({
        signed_token: signedToken,
        name,
        course,
        student_id,
        expiry
      }).returning();
      dbRecord = newRecord;
    }

    // Generate QR Code data URI
    const qrUrl = `https://verify.factoryscan.io/id/${signedToken}`;
    const qrCodeDataUri = await QRCode.toDataURL(qrUrl, {
      width: 400,
      margin: 2,
    });

    res.json({
      success: true,
      result: {
        qr_code: qrCodeDataUri,
        signed_token: signedToken,
        record: dbRecord
      }
    });

  } catch (err) {
    console.error('ID generation error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// POST /api/v1/id/verify
router.post('/verify', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: 'Image file required' });

    // 1. Extract QR Code
    const qrData = await extractQRCode(req.file.buffer);
    
    if (!qrData) {
      return res.json({
        success: true,
        result: { verdict: "UNVERIFIED", reason: "No readable QR code found on the ID card." }
      });
    }

    // Expecting QR code format: https://verify.factoryscan.io/id/[signed-token]
    const tokenMatch = qrData.match(/\/id\/([a-zA-Z0-9_-]+)$/);
    const signedToken = tokenMatch ? tokenMatch[1] : qrData;

    // 2. Lookup Ground Truth Data
    const [groundTruth] = await db.select().from(physicalIds).where(eq(physicalIds.signed_token, signedToken)).limit(1);

    if (!groundTruth) {
        return res.json({
            success: true,
            result: { verdict: "FRAUD_FLAG", reason: "Invalid or forged QR token." }
        });
    }

    // 3. Perform Actual OCR via Tesseract
    const { data: { text } } = await Tesseract.recognize(req.file.buffer, 'eng');
    console.log("OCR Detected Text:", text); // Logging for debugging
    
    // Simple mock heuristic for matching (you might want more robust regex searching!)
    const ocrDetectedText = text.toLowerCase();
    
    // We try to find the ground truth anywhere in the scanned OCR text
    const nameMatch = groundTruth.name && ocrDetectedText.includes(groundTruth.name.toLowerCase());
    const courseMatch = groundTruth.course && ocrDetectedText.includes(groundTruth.course.toLowerCase());
    const studentIdMatch = groundTruth.student_id && ocrDetectedText.includes(groundTruth.student_id.toLowerCase());

    const ocrResultName = nameMatch ? groundTruth.name : (text.split('\n').slice(0, 3).join(' ') || "UNKNOWN");
    const ocrResultCourse = courseMatch ? groundTruth.course : "UNKNOWN";
    const ocrResultStudentId = studentIdMatch ? groundTruth.student_id : "UNKNOWN";

    // 4. Comparison
    const checks = [
        { field: 'Full Name', gt: groundTruth.name, ocr: ocrResultName, pass: nameMatch },
        { field: 'Course', gt: groundTruth.course, ocr: ocrResultCourse, pass: courseMatch },
        { field: 'Student ID', gt: groundTruth.student_id, ocr: ocrResultStudentId, pass: studentIdMatch }
    ];

    const tamperedFields = checks.filter(c => !c.pass);
    const isMockFraud = tamperedFields.length > 0;

    const [log] = await db.insert(verificationLogs).values({
        endpoint: '/api/v1/id/verify',
        result_status: isMockFraud ? 'FAIL' : 'PASS',
        details: JSON.stringify(checks)
    }).returning();

    return res.json({
        success: true,
        result: {
            verdict: isMockFraud ? "HIGH_FRAUD_PROBABILITY" : "VERIFIED",
            tampered_fields: tamperedFields,
            all_checks: checks
        },
        evidence_report_url: `https://factoryscan.io/reports/${log.id}`
    });

  } catch (err) {
    console.error('ID verification error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default router;
