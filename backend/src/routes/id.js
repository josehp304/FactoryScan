import { Router } from 'express';
import multer from 'multer';
import { extractQRCode } from '../utils/qrExtraction.js';
import { db } from '../db/index.js';
import { physicalIds, verificationLogs } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

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

    // 3. Mock OCR Comparison (A real app would run OCR here and compare)
    const mockOcrResult = {
        name: groundTruth.name,
        course: groundTruth.course,
        student_id: groundTruth.student_id,
        expiry: "Mocked OCR Expiry String" // Intentional mock mismatch for demonstration
    };

    // 4. Comparison
    const checks = [
        { field: 'Full Name', gt: groundTruth.name, ocr: mockOcrResult.name, pass: groundTruth.name === mockOcrResult.name },
        { field: 'Course', gt: groundTruth.course, ocr: mockOcrResult.course, pass: groundTruth.course === mockOcrResult.course },
        { field: 'Student ID', gt: groundTruth.student_id, ocr: mockOcrResult.student_id, pass: groundTruth.student_id === mockOcrResult.student_id }
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
