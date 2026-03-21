# Factory Scan

> **AI-Powered Fraud Prevention & Document Verification**  
> v1.0 · Hackathon Release · March 2026

Factory Scan is a multi-service fraud prevention and document verification API. It protects eCommerce platforms, institutions, and digital services from AI-assisted fraud — including fake refund images, tampered certificates, modified identity documents, and AI-generated fake reviews.

The platform is built around a **Unified Trust Score** — a cross-platform credibility index assigned to every user, shared across all partner businesses.

---

## Table of Contents

- [Core Principles](#core-principles)
- [Plugin & Integration](#plugin--integration)
- [Feature 1 — Refund Image Verification](#feature-1--refund-image-verification)
- [Feature 2 — Document Watermarking & Verification](#feature-2--document-watermarking--verification)
- [Feature 3 — Physical ID Card Verification](#feature-3--physical-id-card-verification)
- [Feature 4 — Review Credibility Scoring](#feature-4--review-credibility-scoring)
- [Tech Stack](#tech-stack)
- [API Reference](#api-reference)

---

## Core Principles

- **Proactive, not just reactive** — fraud is made technically harder before it is attempted
- **Multi-signal** — every verdict combines multiple independent signals, no single point of failure
- **Cross-platform memory** — fraud detected on one platform automatically protects all partner platforms via the Unified Trust Score
- **Evidence-first** — every flagged case produces a downloadable evidence report for dispute resolution

---

## Plugin & Integration

Factory Scan is designed to work as a **drop-in plugin** for any existing business or platform. You don't need to rebuild your fraud detection from scratch — just point your image uploads, document submissions, or review data at our API and get back a structured verdict.

### How Easy Is It?

Integrating Factory Scan into an existing platform takes as little as **one API call**. No SDKs to install, no infrastructure to manage.

```js
// Example: verify a refund image in an existing Node.js backend
const response = await fetch(
  "https://api.factoryscan.io/api/v1/refund/verify",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_API_KEY",
      "Content-Type": "multipart/form-data",
    },
    body: formDataWithImage,
  },
);

const { overall_risk, recommended_action, trust_score } = await response.json();
// → { overall_risk: "HIGH", recommended_action: "DENY", trust_score: 23 }
```

### Who Can Use It

| Business Type                | Use Case                                                    |
| ---------------------------- | ----------------------------------------------------------- |
| eCommerce platforms          | Verify refund images, score product reviews                 |
| Universities & EdTech        | Issue and verify tamper-evident certificates                |
| Banks & lenders              | Verify identity documents and financial certificates        |
| Student discount platforms   | Validate student ID cards (GitHub Education, Spotify, etc.) |
| HR & recruitment platforms   | Verify degree and employment certificates                   |
| SaaS & subscription services | Detect fake or AI-modified verification documents           |

### Integration Options

- **REST API** — call any endpoint directly from your backend, any language, any framework
- **Webhook** — Factory Scan pushes verdicts to your endpoint as events are processed
- **Shopify / WooCommerce plugin** _(roadmap)_ — one-click install from the app store (no need to impliment now)

### Partner Network Benefit

Every business that integrates becomes part of the **Factory Scan Trust Network**. Your users' fraud signals contribute to the shared Trust Score database, and you instantly benefit from fraud patterns detected by every other partner — with zero extra integration work.

---

> Detect AI-generated product damage images used to claim fraudulent refunds

### Problem

Fraudsters use generative AI tools (Midjourney, DALL-E, Stable Diffusion) to create convincing "damaged product" photographs and submit them as evidence for refund requests. Human reviewers cannot reliably distinguish AI-generated images from real photographs. Existing fraud tools do not analyse image content at all. The fraud takes under 60 seconds to execute and can be repeated across multiple platforms.

### Detection Pipeline

Every return image is scanned across 3 independent signals:

| Layer | Signal                  | What It Detects                                             | Method                                          |
| ----- | ----------------------- | ----------------------------------------------------------- | ----------------------------------------------- |
| 1     | AI Generation Forensics | GAN artifacts, diffusion model patterns, unnatural textures | HuggingFace `Ateeqq/ai-vs-human-image-detector` |
| 2     | EXIF Metadata Analysis  | Missing camera model, absent GPS, date mismatch vs. order   | exifr (npm)                                     |
| 3     | User Trust Score Check  | Cross-platform return history across partner network        | Factory Scan Trust DB                           |

### The Unified Trust Score ⭐ Unique Feature

Factory Scan maintains a cross-platform trust database. Each user is identified by a hash of their contact details and device fingerprint. When a user is flagged on **any** partner platform, their Trust Score is reduced — and this is visible to **all** partner platforms.

A fraudster flagged on Partner A will have a degraded Trust Score that makes their next attempt on Partner B automatically suspicious, even with no prior history there.

| Trust Score | Meaning                                         | Recommended Action |
| ----------- | ----------------------------------------------- | ------------------ |
| 80 – 100    | No fraud history across partner network         | Auto-approve       |
| 50 – 79     | Minor flags or limited history                  | Flag for review    |
| 0 – 49      | Multiple fraud signals across partner platforms | Deny / escalate    |

### API Response

```json
{
  "overall_risk": "HIGH",
  "recommended_action": "DENY",
  "trust_score": 23,
  "signal_breakdown": {
    "ai_forensics": { "result": "FAIL", "confidence": 91 },
    "exif_analysis": {
      "result": "FAIL",
      "flags": ["missing_camera", "no_gps"]
    },
    "trust_score_check": { "result": "FAIL", "score": 23, "prior_flags": 4 }
  },
  "evidence_report_url": "https://factoryscan.io/reports/[report-id]"
}
```

---

## Feature 2 — Document Watermarking & Verification

> Invisible cryptographic fingerprints for digital certificates, course completions, and signed agreements

### Problem

Digital certificates (degrees, online course completions, internship letters, signed agreements) are trivially editable using modern AI tools. Fraudsters modify names, grades, course titles, and dates to claim benefits they are not entitled to — student discounts, employment, credit, visa approvals.

### Supported Document Types

- University degree certificates and academic transcripts
- Online course completion certificates (Coursera, Udemy, etc.)
- Internship and employment letters
- Digitally signed agreements and contracts
- Professional certifications (AWS, Google, Microsoft, etc.)

### Watermark Embedding (At Issuance)

```
Institution generates document
        ↓
POST /api/v1/document/watermark
        ↓
Factory Scan encodes invisible payload:
{ issuer_id, recipient_name, document_type, issue_date, doc_hash, expiry }
        ↓
Watermarked document returned → delivered to recipient
Factory Scan stores hashed record in verification database
```

### Watermark Verification (At Submission)

```
Recipient submits document to platform
        ↓
POST /api/v1/document/verify
        ↓
Factory Scan extracts watermark
        ↓
Watermark intact?  → Verify fields against stored record → VERIFIED ✅
Watermark broken?  → Document was AI-modified or regenerated → FRAUD FLAG 🔴
Watermark absent?  → Document not issued through Factory Scan → UNVERIFIED ⚠️
```

### Why AI Regeneration Destroys the Watermark

When an AI model modifies or regenerates an image, it creates **new pixel values from scratch** using its trained distribution — it does not copy original pixels. The invisible pattern encoded in the original pixel values is completely absent in the output. This destruction is mathematically detectable and serves as proof of tampering.

### Watermark Robustness Tiers

| Tier       | Technique                   | Survives                                        | Use Case                |
| ---------- | --------------------------- | ----------------------------------------------- | ----------------------- |
| Basic      | LSB (Least Significant Bit) | Screen capture, minor edits                     | Hackathon demo          |
| Standard   | DCT-Domain Watermarking     | JPEG compression, brightness/contrast changes   | Production certificates |
| Enterprise | Spread Spectrum             | Cropping, resizing, rotation, colour correction | Legal agreements        |

---

## Feature 3 — Physical ID Card Verification

> QR-code-based ground truth verification for photographed physical identity documents

### Problem

Physical identity documents (student ID cards, membership cards, employee badges) are being modified using AI inpainting tools. Fraudsters change course names, extend expiry dates, or alter personal details to unlock student discounts, education credits (e.g. GitHub Education), subscription plans, and access controls.

Unlike fully AI-generated images, these attacks are harder to detect because the **base document is real** — only a small region has been modified.

### Architecture

The system has two components: a QR code printed on the card at issuance, and a backend verification flow at submission.

#### Step 1 — Card Issuance (Institution Side)

1. Institution registers with Factory Scan and issues cards through the platform
2. Each card is assigned a unique cryptographically signed token
3. A QR code encoding a signed verification URL is printed on the card:
   ```
   https://verify.factoryscan.io/id/[signed-token]
   ```
4. Ground truth data is stored in the Factory Scan database:
   ```json
   {
     "name": "John Smith",
     "course": "BSc Computer Science",
     "student_id": "20210445",
     "expiry": "Aug 2024"
   }
   ```

#### Step 2 — Verification Flow (Platform Side)

1. User photographs their ID card and submits it
2. Platform sends image to `POST /api/v1/id/verify`
3. Factory Scan scans for QR code → decodes and validates the signed token
4. Backend fetches ground truth data for that token
5. OCR extracts visible text fields from the image
6. AI compares ground truth vs OCR output, field by field
7. Any mismatch → FRAUD FLAG with field-level detail

### Field Comparison Example

| Field       | Ground Truth (DB)    | OCR Result (Image)       | Result  |
| ----------- | -------------------- | ------------------------ | ------- |
| Full Name   | John Smith           | John Smith               | ✅ PASS |
| Course      | BSc Computer Science | **MSc** Computer Science | 🔴 FAIL |
| Expiry Date | August 2024          | **August 2026**          | 🔴 FAIL |
| Student ID  | 20210445             | 20210445                 | ✅ PASS |

**Verdict: HIGH FRAUD PROBABILITY — 2 fields tampered (Course, Expiry Date)**

### QR Code Anti-Tampering

- **Cryptographic signing** — tokens are signed with the institution's private key; forged URLs are rejected
- **Token binding** — each token is bound to a specific institution; cross-institution reuse is blocked
- **Verification logs** — each attempt is logged; reusing another person's valid QR is detectable

---

## Feature 4 — Review Credibility Scoring

> Score product reviews for AI generation, spam content, and user trust level

### Problem

Fake and AI-generated product reviews distort purchasing decisions and harm legitimate sellers. Existing solutions analyse review text in isolation. Factory Scan adds a third dimension: the **trust history of the reviewer across the entire partner network**.

### Three-Signal Pipeline

#### Signal 1 — AI Content Detection

Analyses review text for language model generation patterns: unnaturally uniform sentence structure, absence of personal detail, generic superlatives, statistically improbable vocabulary, and lack of first-person experience markers.

Returns: `ai_probability` (0–100%) + confidence level

#### Signal 2 — Spam & Manipulation Detection

Checks for coordinated fraud patterns:

- Review text nearly identical to other reviews (copy-paste rings)
- Extreme sentiment with no specific product detail
- Review posted within minutes of account creation
- Reviewer has reviewed many unrelated products in a short window
- Incentive language detection

#### Signal 3 — Reviewer Trust Score

The reviewer's Factory Scan Trust Score is applied as a weighting factor. A user flagged for refund fraud on any partner platform will have their review credibility automatically reduced across the entire network — no platform-specific history required.

### Credibility Score Output

| Credibility Score | Interpretation                                | Recommended Action        |
| ----------------- | --------------------------------------------- | ------------------------- |
| 75 – 100          | High credibility. Likely genuine review.      | Display prominently       |
| 40 – 74           | Moderate credibility. Some signals present.   | Display with lower weight |
| 0 – 39            | Low credibility. Likely fake or AI-generated. | Hide or flag for review   |

### API Usage

**Request:**

```json
{
  "reviewer_id": "usr_abc123",
  "review_text": "Amazing product, works perfectly!",
  "rating": 5,
  "product_id": "prod_xyz",
  "review_date": "2026-03-21",
  "platform_id": "partner_shopify_001"
}
```

**Response:**

```json
{
  "credibility_score": 31,
  "recommendation": "HIDE",
  "ai_probability": 87,
  "spam_flags": ["generic_superlatives", "no_personal_detail"],
  "reviewer_trust_score": 28,
  "signals": {
    "ai_detection": { "result": "FAIL", "probability": 87 },
    "spam_check": { "result": "FAIL", "flags": 2 },
    "trust_score": { "result": "FAIL", "score": 28 }
  }
}
```

---

## Tech Stack

| Layer          | Technology                                      | Purpose                                            |
| -------------- | ----------------------------------------------- | -------------------------------------------------- |
| Frontend       | Next.js / React                                 | Dashboard UI, demo interface                       |
| Backend API    | Node.js / Express                               | REST API, image processing, orchestration          |
| Steganography  | steganography.js                                | Embed and extract invisible watermarks             |
| AI Detection   | HuggingFace `Ateeqq/ai-vs-human-image-detector` | AI-generated image detection                       |
| EXIF Analysis  | exifr (npm)                                     | Metadata extraction and anomaly detection          |
| QR Scanning    | jsQR (npm)                                      | QR code detection in uploaded photos               |
| Database       | Neon DB (serverless Postgres)                   | Trust score DB, document hashes, verification logs |
| Authentication | Neon Auth                                       | User identity, partner API key management          |
| Hosting        | Vercel / Railway                                | Fast deployment                                    |

---

## API Reference

| Endpoint                     | Method       | Feature                             |
| ---------------------------- | ------------ | ----------------------------------- |
| `/api/v1/refund/verify`      | POST (image) | Refund image fraud scan             |
| `/api/v1/document/watermark` | POST (file)  | Embed watermark in digital document |
| `/api/v1/document/verify`    | POST (file)  | Verify watermark integrity          |
| `/api/v1/id/verify`          | POST (image) | Physical ID card verification       |
| `/api/v1/review/score`       | POST (JSON)  | Review credibility scoring          |
| `/api/v1/user/trust-score`   | GET          | Retrieve Trust Score for a user     |

All endpoints return a standardised JSON envelope:

```json
{
  "success": true,
  "result": { ... },
  "evidence_report_url": "https://factoryscan.io/reports/[id]"
}
```

---

_Factory Scan · v1.0 · Hackathon Release · March 2026_

example code to use the huggingface model

async function query(data) {
const response = await fetch(
"https://router.huggingface.co/hf-inference/models/Ateeqq/ai-vs-human-image-detector",
{
headers: {
Authorization: `Bearer ${process.env.HF_TOKEN}`,
"Content-Type": "image/jpeg",
},
method: "POST",
body: JSON.stringify(data),
}
);
const result = await response.json();
return result;
}

query({ inputs: "cats.jpg" }).then((response) => {
console.log(JSON.stringify(response));
});
