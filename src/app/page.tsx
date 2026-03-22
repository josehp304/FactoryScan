"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { motion, useInView, useAnimationControls, AnimatePresence } from "framer-motion";
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
  AlertTriangle,
  Ban,
} from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const MOCK_TRANSACTIONS = [
  { id: "tx_8921A", amount: "$149.00", user: "j.doe@example.com", status: "VERIFIED", node: "Node-US-East" },
  { id: "tx_3C4D9", amount: "$89.50", user: "maria.s@example.com", status: "VERIFIED", node: "Node-EU-West" },
  { id: "tx_5E6F2", amount: "$1,200.00", user: "anon_991@crypto.net", status: "FLAGGED", node: "Node-AP-South" },
  { id: "tx_7G8H4", amount: "$24.99", user: "k.smith@domain.com", status: "VERIFIED", node: "Node-US-West" },
  { id: "tx_9I0J7", amount: "$4,500.00", user: "unknown@proxy.vpn", status: "FLAGGED", node: "Node-EU-Central" },
  { id: "tx_1K2L3", amount: "$350.00", user: "alice.w@company.com", status: "VERIFIED", node: "Node-AF-North" },
];

function LiveTransactionFeed() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transactions, setTransactions] = useState<any[]>([]);
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTransactions((prev) => {
        const nextTx = MOCK_TRANSACTIONS[index % MOCK_TRANSACTIONS.length];
        const newTx = { ...nextTx, _uid: Date.now() }; // unique ID for animation
        const updated = [newTx, ...prev];
        if (updated.length > 5) updated.pop();
        return updated;
      });
      index++;
    }, 2000); // New transaction every 2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.terminalBox}>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalDots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <span className={styles.terminalTitle}>live_network_feed</span>
        <div className={styles.headerPing}>
          <span className={styles.pingDot} />
          ACTIVE
        </div>
      </div>
      <div className={styles.terminalBody}>
        <AnimatePresence>
          {transactions.map((tx) => (
            <motion.div
              key={tx._uid}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, scale: 0.95, height: 0 }}
              className={styles.transactionRow}
            >
              <div className={styles.txInfo}>
                <span className={styles.txId}>{tx.id}</span>
                <span className={styles.txUser}>{tx.user}</span>
                <span className={styles.txAmount}>{tx.amount}</span>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem'}}>
                <span className={tx.status === 'VERIFIED' ? styles.statusVerified : styles.statusFlagged}>
                  {tx.status}
                </span>
                <span className={styles.txNode}>{tx.node}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

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

        {/* Floating UI Elements */}
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
                <div className={styles.floatIcon} style={{ color: '#10b981' }}><CheckCircle2 size={18} /></div>
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

      {/* Trust Ticker */}
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
          <Card hoverEffect glowColor="var(--primary)">
            <div className={styles.featureIcon}><Scan /></div>
            <h3 className={styles.featureTitle}>Refund Image Verification</h3>
            <p className={styles.featureDesc}>
              Detect AI-generated product damage images used for fraudulent refunds. Scans for GAN artifacts, EXIF anomalies, and cross-platform history.
            </p>
            <Link href="/features/refund-verification" className={styles.featureLink}>
              Try Demo <ArrowRight size={16} />
            </Link>
          </Card>
          <Card hoverEffect glowColor="var(--secondary)">
            <div className={styles.featureIcon}><Fingerprint /></div>
            <h3 className={styles.featureTitle}>Document Watermarking</h3>
            <p className={styles.featureDesc}>
              Invisible cryptographic fingerprints for digital certificates. AI regeneration destroys the watermark—providing mathematical proof of tampering.
            </p>
            <Link href="/features/document-watermark" className={styles.featureLink}>
              Try Demo <ArrowRight size={16} />
            </Link>
          </Card>
          <Card hoverEffect glowColor="var(--success)">
            <div className={styles.featureIcon}><ShieldCheck /></div>
            <h3 className={styles.featureTitle}>Physical ID Card Verification</h3>
            <p className={styles.featureDesc}>
              QR-code-based ground truth verification for photographed identity documents. Defeats AI inpainting tools by comparing OCR against signed data.
            </p>
            <Link href="/features/id-verification" className={styles.featureLink}>
              Try Demo <ArrowRight size={16} />
            </Link>
          </Card>
          <Card hoverEffect glowColor="var(--destructive)">
            <div className={styles.featureIcon}><MessageSquareWarning /></div>
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

      {/* === REDESIGNED: Live Network Section === */}
      <section className={styles.networkSection}>
        {/* Background glow blobs */}
        <div className={styles.networkBg}>
          <div className={styles.networkBlob1} />
        </div>

        <div className={styles.networkContent}>
          {/* LEFT: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.networkText}
          >
            <div className={styles.trustEyebrow}>Decentralized Intelligence</div>
            <h2 className={styles.trustHeading}>Live Global<br /><span className={styles.trustGradientWord}>Verification Network</span></h2>
            <p className={styles.trustDesc}>
              Watch transactions as they are routed through our decentralized intelligence nodes. Advanced AI models scan payloads in milliseconds, automatically filtering anomalies and authorizing genuine users with unparalleled speed and accuracy.
            </p>
          </motion.div>

          {/* RIGHT: Live Feed Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={styles.networkVisual}
          >
            <LiveTransactionFeed />
          </motion.div>
        </div>
      </section>

      {/* EXTENSION SECTION */}
      <section className={styles.extSection}>
        <div className={styles.extContainer}>
          <motion.div 
            className={styles.extTextContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Factory-Scan <br/><span className={styles.extHighlight}>Anywhere You Browse</span></h2>
            <p className={styles.extDesc}>
              Stop manually checking reviews. Install our secure extension to automatically classify reviews and detect suspicious patterns on any storefront.
            </p>

            <div className={styles.extSteps}>
              <div className={styles.extStep}>
                <div className={styles.extStepNumber}>1</div>
                <div className={styles.extStepText}>
                  <h4>Download & Extract</h4>
                  <p>Download the latest release and extract it to a local folder.</p>
                </div>
              </div>
              <div className={styles.extStep}>
                <div className={styles.extStepNumber}>2</div>
                <div className={styles.extStepText}>
                  <h4>Activate Developer Mode</h4>
                  <p>Go to <code>chrome://extensions</code> and toggle Developer mode on.</p>
                </div>
              </div>
              <div className={styles.extStep}>
                <div className={styles.extStepNumber}>3</div>
                <div className={styles.extStepText}>
                  <h4>Load Unpacked</h4>
                  <p>Click &quot;Load unpacked&quot; and select your extracted folder.</p>
                </div>
              </div>
            </div>

            <div className={styles.extDownloadBtnWrapper}>
              <div className={styles.pulseGlow}></div>
              <motion.a 
                href="/extension.zip"
                download
                className={styles.extDownloadBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap size={22} fill="currentColor" /> 
                Get the Extension
              </motion.a>
            </div>
          </motion.div>

          {/* VISUAL MOCKUP */}
          <motion.div 
            className={styles.extVisual}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.extBrowserMockup}>
              {/* Browser Header */}
              <div className={styles.extBrowserHeader}>
                <div className={styles.extBrowserDot}/>
                <div className={styles.extBrowserDot}/>
                <div className={styles.extBrowserDot}/>
                <div className={styles.extBrowserAddress}>https://examplestore.com/product</div>
              </div>

              {/* Browser Content */}
              <div className={styles.extBrowserBody}>
                
                {/* Fake Review 1 */}
                <div className={styles.extFakeReview}>
                  <div className={styles.extScanBadge}>
                    <AlertTriangle size={12} strokeWidth={3} />
                    AI GENERATED
                  </div>
                  <div className={styles.extReviewHeader}>
                    <span>&quot;Amazing product, changed my life...&quot;</span>
                    <span className={styles.extReviewStars}>★★★★★</span>
                  </div>
                  <div className={styles.extReviewBars}>
                    <div className={styles.extBar}></div>
                    <div className={`${styles.extBar} ${styles.medium}`}></div>
                  </div>
                </div>

                {/* Fake Review 2 */}
                <div className={styles.extFakeReview}>
                  <div className={`${styles.extScanBadge} ${styles.genuine}`}>
                    <CheckCircle2 size={12} strokeWidth={3} />
                    GENUINE
                  </div>
                  <div className={styles.extReviewHeader}>
                    <span>&quot;Works as expected, shipping was...&quot;</span>
                    <span className={styles.extReviewStars}>★★★★☆</span>
                  </div>
                  <div className={styles.extReviewBars}>
                    <div className={`${styles.extBar} ${styles.short}`}></div>
                    <div className={styles.extBar}></div>
                  </div>
                </div>

                {/* Scanner Beam Animation */}
                <motion.div 
                  className={styles.extScannerBeam}
                  animate={{
                    y: [0, 200, 0],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      
    </div>
  );
}

