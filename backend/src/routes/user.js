import { Router } from 'express';
import { eq, or } from 'drizzle-orm';
import { db } from '../db/index.js';
import { trustProfiles } from '../db/schema.js';

const router = Router();

// GET /api/v1/user/trust-score
router.get('/trust-score', async (req, res) => {
  try {
    const { email, phone_number } = req.query;
    
    if (!email && !phone_number) {
      return res.status(400).json({ success: false, error: 'Must provide email or phone_number query parameter' });
    }

    const conditions = [];
    if (email) conditions.push(eq(trustProfiles.email, email));
    if (phone_number) conditions.push(eq(trustProfiles.phone_number, phone_number));

    const [user] = await db
      .select()
      .from(trustProfiles)
      .where(or(...conditions))
      .limit(1);

    if (!user) {
      return res.json({
        success: true,
        result: {
          trust_score: 100, // Default for new users
          prior_flags: 0,
          is_new_user: true
        }
      });
    }

    return res.json({
      success: true,
      result: {
        trust_score: user.trust_score,
        prior_flags: user.prior_flags,
        is_new_user: false
      }
    });

  } catch (err) {
    console.error('Trust score lookup error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default router;
