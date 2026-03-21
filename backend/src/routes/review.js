import { Router } from 'express';
import { db } from '../db/index.js';
import { verificationLogs } from '../db/schema.js';
import { upsertAndScoreTrustProfile } from '../utils/trustProfile.js';

const router = Router();

// Basic heuristic for AI text (Mock)
function assessAiText(text) {
    const aiPatterns = [/delve into/, /testament to/, /in conclusion/, /tapestry/];
    let flags = 0;
    aiPatterns.forEach(r => { if (r.test(text.toLowerCase())) flags++; });
    return flags > 0 ? 85 : 12;
}

// Basic heuristic for spam/manipulation
function assessSpam(text) {
    if (text.length < 10) return ['too_short'];
    if (text.match(/buy now|click here/i)) return ['spam_language'];
    return [];
}

// POST /api/v1/review/score
router.post('/score', async (req, res) => {
  try {
    const { reviewer_email, reviewer_phone, review_text, platform_id } = req.body;

    if (!review_text || (!reviewer_email && !reviewer_phone)) {
        return res.status(400).json({ success: false, error: 'Review text and reviewer contact required' });
    }

    // 1. AI Probability
    const aiProbability = assessAiText(review_text);

    // 2. Spam assessment
    const spamFlags = assessSpam(review_text);

    // 3. Determine outcome for trust scoring
    let outcome = 'PASS';
    if (aiProbability > 80 || spamFlags.length > 0) {
      outcome = aiProbability > 80 ? 'FAIL' : 'FLAG';
    }

    // 4. Upsert trust profile and update score based on this request's outcome
    const trustProfile = await upsertAndScoreTrustProfile(
      db,
      { email: reviewer_email, phone_number: reviewer_phone },
      outcome
    );
    const trustScore = trustProfile?.trust_score ?? 100;
    const totalChecks = trustProfile?.total_checks ?? 1;

    // 5. Calculate final credibility using updated trust score
    let credibilityScore = 100;
    if (aiProbability > 80) credibilityScore -= 40;
    if (spamFlags.length > 0) credibilityScore -= 30;
    if (trustScore < 50) credibilityScore -= 50;
    else if (trustScore < 80) credibilityScore -= 20;

    credibilityScore = Math.max(0, Math.min(100, credibilityScore));

    let recommendation = 'DISPLAY';
    if (credibilityScore < 40) recommendation = 'HIDE';
    else if (credibilityScore < 75) recommendation = 'FLAG_FOR_REVIEW';

    const result = {
        credibility_score: credibilityScore,
        recommendation,
        ai_probability: aiProbability,
        spam_flags: spamFlags,
        reviewer_trust_score: trustScore,
        signals: {
            ai_detection: { result: aiProbability > 50 ? 'FAIL' : 'PASS', probability: aiProbability },
            spam_check: { result: spamFlags.length > 0 ? 'FAIL' : 'PASS', flags: spamFlags.length },
            trust_score: {
              result: trustScore < 80 ? 'FAIL' : 'PASS',
              score: trustScore,
              total_checks: totalChecks,
              profile_status: trustProfile ? 'existing' : 'new',
            }
        }
    };

    const [log] = await db.insert(verificationLogs).values({
        endpoint: '/api/v1/review/score',
        result_status: recommendation === 'HIDE' ? 'FAIL' : 'PASS',
        details: JSON.stringify(result)
    }).returning();

    return res.json({
        success: true,
        result,
        evidence_report_url: `https://factoryscan.io/reports/${log.id}`
    });

  } catch (err) {
    console.error('Review scoring error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default router;
