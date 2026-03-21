"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { BackButton } from "@/components/ui/BackButton";
import { ShieldAlert, ShieldCheck, Activity, Image as ImageIcon, FileText, FileBadge2, ArrowRight } from "lucide-react";

const STATS = [
  { label: "Total Operations", value: "24,892", icon: Activity, trend: "+12%" },
  { label: "Fraud Stopped", value: "1,204", icon: ShieldAlert, trend: "+4%" },
  { label: "Avg Trust Score", value: "82/100", icon: ShieldCheck, trend: "Stable" },
];

const QUICK_ACCESS = [
  { id: "id-verify", label: "ID Verification", desc: "Scan and authenticate Passports & IDs", href: "/features/id-verification", icon: ShieldCheck, color: "var(--primary)" },
  { id: "refund-verify", label: "Refund Review", desc: "Analyze return requests for fraud", href: "/features/refund-verification", icon: ImageIcon, color: "var(--success)" },
  { id: "review-score", label: "Review Scoring", desc: "Detect fake or AI-generated reviews", href: "/features/review-scoring", icon: FileText, color: "#f59e0b" },
  { id: "doc-watermark", label: "Watermark Check", desc: "Find alterations in documents", href: "/features/document-watermark", icon: FileBadge2, color: "var(--secondary)" },
];

const RECENT = [
  { id: "req_u98xa", type: "Refund Image", method: "AI Forensics", status: "FLAGGED", risk: "HIGH", time: "2m ago", icon: ImageIcon },
  { id: "req_z09bc", type: "Degree Certificate", method: "Watermark", status: "VERIFIED", risk: "LOW", time: "14m ago", icon: FileBadge2 },
  { id: "req_m12px", type: "Product Review", method: "Network Trust", status: "FLAGGED", risk: "HIGH", time: "1h ago", icon: FileText },
  { id: "req_b76qk", type: "ID Verification", method: "QR Ground Truth", status: "VERIFIED", risk: "LOW", time: "2h ago", icon: ShieldCheck },
];

export default function DashboardPage() {
  const [statsData, setStatsData] = useState({
    totalOperations: "...",
    fraudStopped: "...",
    avgTrustScore: "..."
  });
  const [recentLogs, setRecentLogs] = useState(RECENT);

  useEffect(() => {
    async function fetchStats() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
        const res = await fetch(`${backendUrl}/user/dashboard-stats`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.stats) {
            setStatsData({
              totalOperations: data.stats.totalOperations.toString(),
              fraudStopped: data.stats.fraudStopped.toString(),
              avgTrustScore: `${data.stats.avgTrustScore}/100`
            });
            if (data.recent && data.recent.length > 0) {
              const mappedRecent = data.recent.map((log: any) => ({
                id: log.id,
                type: log.endpoint || "System Operation",
                method: "Automated scan",
                status: log.result_status || "VERIFIED",
                risk: log.result_status === "FLAGGED" ? "HIGH" : "LOW",
                time: new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                icon: ShieldCheck
              }));
              setRecentLogs(mappedRecent);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    }
    fetchStats();
  }, []);

  const DYNAMIC_STATS = [
    { label: "Total Operations", value: statsData.totalOperations, icon: Activity, trend: "Live" },
    { label: "Fraud Stopped", value: statsData.fraudStopped, icon: ShieldAlert, trend: "Live" },
    { label: "Avg Trust Score", value: statsData.avgTrustScore, icon: ShieldCheck, trend: "Live" },
  ];

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: '1rem' }}>
        <BackButton />
      </div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, Partner</h1>
          <p className={styles.subtitle}>Here is your platform trust overview.</p>
        </div>
        <div className={styles.globalScore}>
          <span>Network Health:</span>
          <div className={styles.scoreBadge}>Excellent</div>
        </div>
      </div>

      {/* Stats row */}
      <div className={styles.statsGrid}>
        {DYNAMIC_STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card glass>
                <div className={styles.statHeader}>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <Icon size={20} className={styles.statIcon} />
                </div>
                <div className={styles.statValueRow}>
                  <h3 className={styles.statValue}>{stat.value}</h3>
                  <span className={styles.statTrend}>{stat.trend}</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Access Grid */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <p className={styles.sectionSubtitle}>Jump directly into core fraud detection tools.</p>
      </div>
      <div className={styles.quickActionsGrid}>
        {QUICK_ACCESS.map((action, i) => {
          const Icon = action.icon;
          return (
            <Link href={action.href} key={action.id}>
              <motion.div
                className={styles.quickActionCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className={styles.cardGlow} style={{ background: action.color }} />
                <div className={styles.quickActionIcon} style={{ background: `color-mix(in srgb, ${action.color} 15%, transparent)` }}>
                  <Icon size={24} style={{ color: action.color }} />
                </div>
                <div className={styles.quickActionContent}>
                  <h3 className={styles.quickActionTitle}>{action.label}</h3>
                  <p className={styles.quickActionDesc}>{action.desc}</p>
                </div>
                <div className={styles.quickActionFooter} style={{ color: action.color }}>
                  Start Scan <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className={styles.mainGrid}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className={styles.chartCol}
        >
          <Card glass hoverEffect>
            <h3 className={styles.cardTitle}>Live Threat Map</h3>
            <div className={styles.chartPlaceholder}>
              {/* Decorative radar/map or lines could go here */}
              <div className={styles.mapGrid} />
              <div className={styles.radarEffect}>
                <div className={styles.radarScanningBar} />
              </div>
              <div className={styles.radarDot} style={{ top: '20%', left: '30%', animationDelay: '0s' }} />
              <div className={styles.radarDot} style={{ top: '60%', left: '70%', animationDelay: '1.2s' }} />
              <div className={styles.radarDot} style={{ top: '45%', left: '80%', animationDelay: '0.5s' }} />
              <p className={styles.scanningText}>Scanning global trust network...</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={styles.recentCol}
        >
          <Card glass>
            <h3 className={styles.cardTitle}>Recent Operations</h3>
            <div className={styles.recentList}>
              {recentLogs.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className={styles.recentItem}>
                    <div className={styles.recentIconWrapper}>
                      <Icon size={20} className={item.risk === "HIGH" ? styles.destructive : styles.primary} />
                    </div>
                    <div className={styles.recentDetails}>
                      <p className={styles.recentType}>{item.type}</p>
                      <p className={styles.recentMethod}>vias {item.method} • {item.time}</p>
                    </div>
                    <div className={cn(styles.recentStatus, item.status === "FLAGGED" ? styles.bgDestructive : styles.bgSuccess)}>
                      {item.status}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// Utility class concatenator if cn doesn't work out of the box in the same file
function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
