"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, Copy, Eye, EyeOff, KeyRound, Server, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";

export default function APIKeysPage() {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const apiKey = "fs_live_9x81mNkLp2Qv5RdEz4WcY";

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topNav}>
        <BackButton />
      </div>
      <div className={styles.header}>
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <h1 className={styles.title}>API Management</h1>
          <p className={styles.subtitle}>
            Manage your credentials and secure your server-to-server integrations.
          </p>
        </motion.div>
      </div>

      <div className={styles.grid}>
        {/* API Key Management */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card glass>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <KeyRound size={24} className={styles.iconPrimary} />
              </div>
              <div className={styles.headerText}>
                <h2 className={styles.cardTitle}>Live API Key</h2>
                <p className={styles.cardDesc}>This key provides full access to your production data.</p>
              </div>
            </div>

            <div className={styles.apiKeyContainer}>
              <div className={styles.keyBox}>
                <code className={styles.keyText}>
                  {showKey ? apiKey : "fs_live_•••••••••••••••••••••••"}
                </code>
                <div className={styles.keyActions}>
                  <button onClick={() => setShowKey(!showKey)} className={styles.iconBtn} title="Toggle visibility">
                    {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button onClick={handleCopy} className={styles.iconBtn} title="Copy to clipboard">
                    {copied ? <Check size={18} className={styles.successColor} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
              <div className={styles.keyFooter}>
                <p className={styles.warning}>
                  <ShieldCheck size={14} /> Keep this key secret. If compromised, revoke it immediately.
                </p>
              </div>
            </div>

            <div className={styles.actionRow}>
                <Button variant="outline" size="sm">Revoke Key</Button>
                <Button variant="ghost" size="sm">Rotate Key</Button>
            </div>
          </Card>
        </motion.div>

        {/* Usage Stats / Quota */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card glass>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper} style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                <Zap size={24} style={{ color: 'var(--primary)' }} />
              </div>
              <div className={styles.headerText}>
                <h2 className={styles.cardTitle}>Plan Usage</h2>
                <p className={styles.cardDesc}>Developer Sandbox Plan</p>
              </div>
            </div>

            <div className={styles.quotaSection}>
              <div className={styles.quotaRow}>
                <span>Requests used</span>
                <span>892 / 5,000</span>
              </div>
              <div className={styles.progressBar}>
                <motion.div 
                    className={styles.progressFill} 
                    initial={{ width: 0 }}
                    animate={{ width: '18%' }}
                    transition={{ duration: 1 }}
                />
              </div>
              <div className={styles.quotaRow}>
                <span>Monthly reset in</span>
                <span>12 days</span>
              </div>
            </div>

            <Button variant="primary" className="w-full">Upgrade Plan</Button>
          </Card>
        </motion.div>
      </div>

      {/* Webhooks Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card glass className={styles.fullWidthCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper} style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
                <Server size={24} style={{ color: 'var(--secondary)' }} />
              </div>
              <div className={styles.headerText}>
                <h2 className={styles.cardTitle}>Incoming Webhooks</h2>
                <p className={styles.cardDesc}>Receive real-time notifications for event-driven workflows.</p>
              </div>
            </div>

            <div className={styles.webhookSetup}>
                <div className={styles.inputGroup}>
                    <label>Webhook endpoint URL</label>
                    <div className={styles.inputRow}>
                        <input type="text" placeholder="https://your-api.com/webhooks/factory-scan" className={styles.input} />
                        <Button>Save Config</Button>
                    </div>
                </div>
            </div>
          </Card>
      </motion.div>
    </div>
  );
}
