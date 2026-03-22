'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Space_Grotesk, Syne, Fira_Code } from 'next/font/google';

const space = Space_Grotesk({ subsets: ['latin'] });
const syne = Syne({ subsets: ['latin'] });
const fira = Fira_Code({ subsets: ['latin'] });

export default function TrustDatabase() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const trustLogs = [
    { id: 'tx_8892', store: 'Aura Electronics', date: '2026-03-21', action: 'VERIFIED_PURCHASE', impact: '+15', status: 'positive' },
    { id: 'tx_7731', store: 'UrbanKicks Market', date: '2026-03-18', action: 'DISPUTE_OPENED', impact: '-5', status: 'negative' },
    { id: 'tx_6104', store: 'Global Traders', date: '2026-03-10', action: 'ACCOUNT_AGE', impact: '+2', status: 'positive' },
    { id: 'tx_5592', store: 'Zion Retail', date: '2026-03-05', action: 'REVIEW_VALIDATED', impact: '+8', status: 'positive' },
    { id: 'tx_4021', store: 'NeonSupply Co', date: '2026-02-28', action: 'FAST_RESOLVE', impact: '0', status: 'neutral' }
  ];

  return (
    <div className={`${styles.container} ${space.className}`}>
      <div className={styles.noise}></div>
      
      <section className={styles.hero}>
        <div className={styles.glowSphere}></div>
        <div className={styles.badge}>System Protocol Alpha</div>
        <h1 className={`${styles.title} ${syne.className}`}>
          THE NEW INTERNET<br />OFT_RUST.
        </h1>
        <p className={styles.subtitle}>
          We are not just a database. We are a decentralized ledger of reputation. For the first time, your history across the entire e-commerce network dictates your reality. A truly groundbreaking paradigm shift in digital interaction.
        </p>
      </section>

      <section className={styles.statement}>
        <h2 className={`${styles.statementText} ${syne.className}`}>
          A <span className={styles.highlight}>GROUNDBREAKING</span> APPROACH TO E-COMMERCE.<br/>YOUR IDENTITY IS NOW YOUR GREATEST ASSET.
        </h2>
      </section>

      <div className={styles.dashboardSection}>
        {/* Node Network Map */}
        <div className={styles.card}>
          <h3 className={styles.sectionTitle}>Network Topography</h3>
          <p style={{ color: '#a3a3a3', marginBottom: '1rem' }}>Live visualization of cross-store identity mapping.</p>
          <div className={styles.networkVisualization}>
            {/* Center Node */}
            <div className={`${styles.node} ${styles.nodeCenter}`}>
              YOU
            </div>
            
            {/* Orbiting Nodes */}
            {mounted && [
              { label: 'Aura', x: 20, y: 10, delay: 0 },
              { label: 'Urban', x: 80, y: 15, delay: 0.2 },
              { label: 'Zion', x: 15, y: 80, delay: 0.4 },
              { label: 'Global', x: 85, y: 75, delay: 0.6 },
              { label: 'Neon', x: 50, y: 90, delay: 0.8 },
            ].map((node, i) => {
              const dx = (node.x - 50) * 3;
              const dy = (node.y - 50) * 3;
              const angle = Math.atan2(dy, dx) * (180 / Math.PI);
              const distance = Math.sqrt(dx * dx + dy * dy);

              return (
                <React.Fragment key={i}>
                  <div 
                    className={styles.connectionLine}
                    style={{
                      left: '50%',
                      top: '50%',
                      width: `${distance}px`,
                      transform: `rotate(${angle}deg)`,
                    }}
                  />
                  <div 
                    className={styles.node}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      animation: `pulse 2s infinite alternate ${node.delay}s`
                    }}
                  >
                    {node.label}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Global Trust Score Component */}
        <div className={styles.card}>
          <div className={styles.scoreVisualizer}>
            <div className={styles.scoreCircle}>
              <div className={styles.scoreContent}>
                <div className={`${styles.scoreValue} ${syne.className}`}>94</div>
                <div className={`${styles.scoreLabel} ${space.className}`}>Trust Index</div>
              </div>
            </div>
            <p style={{ color: '#a3a3a3', textAlign: 'center', marginTop: '1rem' }}>
              Your universal trust score algorithmically synthesized from millions of global data points.
            </p>
          </div>
        </div>

        {/* Audit Log */}
        <div className={`${styles.card} ${styles.fullWidth}`} style={{ gridColumn: '1 / -1' }}>
          <h3 className={styles.sectionTitle}>Global Audit Log</h3>
          <div className={styles.logTableContainer}>
            <div className={styles.logHeader}>
              <div style={{ flex: 1 }}>Origin / Timestamp</div>
              <div style={{ flex: 1, textAlign: 'center' }}>Event Protocol</div>
              <div style={{ flex: 0.5, textAlign: 'right' }}>Trust Delta</div>
            </div>
            
            {trustLogs.map((log) => (
              <div key={log.id} className={styles.logRow}>
                <div className={styles.logStore} style={{ flex: 1 }}>
                  {log.store}
                  <small className={fira.className}>{log.date} • {log.id}</small>
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <span className={`${styles.logAction} ${fira.className}`}>{log.action}</span>
                </div>
                <div style={{ flex: 0.5, textAlign: 'right' }} className={`${styles.logTrust} ${styles[log.status]}`}>
                  {log.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
