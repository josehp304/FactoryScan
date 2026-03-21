"use client";
import React from "react";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ShieldCheck,
  Fingerprint,
  Scan,
  MessageSquareWarning,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gridOverlay} />
          <div className={styles.blob1} />
          <div className={styles.blob2} />
        </div>
        
        <motion.div
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div variants={fadeIn} className={styles.badge}>
            <span className={styles.badgeLabel}>v1.0 Hackathon Release</span>
          </motion.div>
          
          <motion.h1 variants={fadeIn} className={styles.title}>
            AI-Powered <br />
            <span className="text-gradient">Fraud Prevention</span> & <br /> Document Verification
          </motion.h1>
          
          <motion.p variants={fadeIn} className={styles.subtitle}>
            Protect your platform from AI-assisted fraud, tampered certificates, and fake reviews. 
            Join the decentralized Unified Trust Score network.
          </motion.p>
          
          <motion.div variants={fadeIn} className={styles.ctaGroup}>
            <Link href="/dashboard">
              <Button size="lg" rightIcon={<ArrowRight />}>
                Launch Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/api-keys">
              <Button variant="secondary" size="lg">
                Get API Access
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeIn} className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>2M+</span>
              <span className={styles.statLabel}>Scans/Day</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>99.9%</span>
              <span className={styles.statLabel}>Accuracy</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>&lt;200ms</span>
              <span className={styles.statLabel}>Latency</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating UI Elements for Eye-Catching effect */}
        <div className={styles.floatingElements}>
            <motion.div 
                className={styles.floatCard}
                style={{ top: '15%', left: '12%' }}
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className={styles.floatIcon}><ShieldCheck size={18} /></div>
                <span>Tamper-Proof</span>
            </motion.div>
            
            <motion.div 
                className={styles.floatCircle}
                style={{ top: '35%', right: '8%' }}
                animate={{ y: [0, 15, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <div className={styles.floatIcon} style={{ color: 'var(--secondary)' }}><Zap size={16} /></div>
            </motion.div>

            <motion.div 
                className={styles.floatCard}
                style={{ top: '65%', left: '15%' }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                <div className={styles.floatIcon} style={{ color: 'var(--success)' }}><CheckCircle2 size={18} /></div>
                <span>Trust Score: 98</span>
            </motion.div>

            <motion.div 
                className={styles.floatCard}
                style={{ top: '55%', right: '15%' }}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className={styles.floatIcon} style={{ color: 'var(--secondary)' }}><Fingerprint size={18} /></div>
                <span>Identity Verified</span>
            </motion.div>
        </div>
      </section>

      {/* Trust Ticker / Logo Cloud */}
      <section className={styles.tickerSection}>
         <div className={styles.tickerWrapper}>
            <div className={styles.tickerContent}>
                <span>TRUSTED BY INDUSTRY LEADERS</span>
                <div className={styles.dot} />
                <span>SECURED OVER $400M IN TRANSACTIONS</span>
                <div className={styles.dot} />
                <span>ACTIVE NODES: 4,892</span>
                <div className={styles.dot} />
                <span>ZERO FALSE POSITIVES IN LAST 24H</span>
                <div className={styles.dot} />
                {/* Duplicate for seamless loop */}
                <span>TRUSTED BY INDUSTRY LEADERS</span>
                <div className={styles.dot} />
                <span>SECURED OVER $400M IN TRANSACTIONS</span>
                <div className={styles.dot} />
                <span>ACTIVE NODES: 4,892</span>
                <div className={styles.dot} />
                <span>ZERO FALSE POSITIVES IN LAST 24H</span>
            </div>
         </div>
      </section>

      {/* Features Overview */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Four Layers of Protection</h2>
          <p className={styles.sectionSubtitle}>
            Every signal combines into a unified Trust Score to mathematically prove document integrity.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {/* Feature 1 */}
          <Card hoverEffect glowColor="var(--primary)">
            <div className={styles.featureIcon}>
              <Scan />
            </div>
            <h3 className={styles.featureTitle}>Refund Image Verification</h3>
            <p className={styles.featureDesc}>
              Detect AI-generated product damage images used for fraudulent refunds. Scans for GAN artifacts, EXIF anomalies, and cross-platform history.
            </p>
            <Link href="/features/refund-verification" className={styles.featureLink}>
              Try Demo <ArrowRight size={16} />
            </Link>
          </Card>

          {/* Feature 2 */}
          <Card hoverEffect glowColor="var(--secondary)">
            <div className={styles.featureIcon}>
              <Fingerprint />
            </div>
            <h3 className={styles.featureTitle}>Document Watermarking</h3>
            <p className={styles.featureDesc}>
              Invisible cryptographic fingerprints for digital certificates. AI regeneration destroys the watermark—providing mathematical proof of tampering.
            </p>
            <Link href="/features/document-watermark" className={styles.featureLink}>
              Try Demo <ArrowRight size={16} />
            </Link>
          </Card>

          {/* Feature 3 */}
          <Card hoverEffect glowColor="var(--success)">
            <div className={styles.featureIcon}>
              <ShieldCheck />
            </div>
            <h3 className={styles.featureTitle}>Physical ID Card Verification</h3>
            <p className={styles.featureDesc}>
              QR-code-based ground truth verification for photographed identity documents. Defeats AI inpainting tools by comparing OCR against signed data.
            </p>
            <Link href="/features/id-verification" className={styles.featureLink}>
              Try Demo <ArrowRight size={16} />
            </Link>
          </Card>

          {/* Feature 4 */}
          <Card hoverEffect glowColor="var(--destructive)">
            <div className={styles.featureIcon}>
              <MessageSquareWarning />
            </div>
            <h3 className={styles.featureTitle}>Review Credibility</h3>
            <p className={styles.featureDesc}>
              Score product reviews for AI generation, spam rings, and prior fraud history to protect sellers and maintain marketplace integrity.
            </p>
            <Link href="/features/review-scoring" className={styles.featureLink}>
              Try Demo <ArrowRight size={16} />
            </Link>
          </Card>
        </div>
      </section>

      {/* Partner Network / Trust Score Section */}
      <section className={styles.trustSection}>
        <div className={styles.trustContent}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={styles.trustText}
          >
            <h2>The Unified Trust Score</h2>
            <p>
              When a fraudster is flagged on one platform, their Trust Score degrades across the entire network. Gain enterprise-grade protection instantly through collective security intelligence.
            </p>
            <ul className={styles.trustList}>
              <li>
                <div className={styles.statusIndicator} data-status="success" />
                <span><strong>80-100:</strong> Auto-Approve</span>
              </li>
              <li>
                <div className={styles.statusIndicator} data-status="warning" />
                <span><strong>50-79:</strong> Flag for Manual Review</span>
              </li>
              <li>
                <div className={styles.statusIndicator} data-status="danger" />
                <span><strong>0-49:</strong> Auto-Deny & Escalate</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={styles.trustVisual}
          >
            <div className={styles.mockScoreCard}>
              <div className={styles.mockHeader}>
                <ShieldCheck className={styles.mockIcon} />
                <span>Network Evaluation</span>
              </div>
              <div className={styles.mockBody}>
                <div className={styles.scoreCircle}>23</div>
                <div className={styles.scoreDetails}>
                  <h4>Overall Risk: <span className={styles.riskHigh}>CRITICAL</span></h4>
                  <p>Prior flags across partner networks: 4</p>
                  <div className={styles.actionDenied}>TRANSACTION BLOCKED</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
