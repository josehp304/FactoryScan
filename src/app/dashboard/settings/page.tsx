"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { 
  User, 
  Shield, 
  Bell, 
  Lock,
  Mail,
  Smartphone,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BackButton />
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your account preferences and security settings.</p>
      </div>

      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <div 
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="activeTab" className={styles.activeIndicator} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card glass className={styles.settingsCard}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name</label>
                <input type="text" className={styles.input} defaultValue="Akshay P" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input type="email" className={styles.input} defaultValue="akshay@factoryscan.io" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Organization</label>
                <input type="text" className={styles.input} defaultValue="Factory Scan Dev" />
              </div>
              <Button variant="primary" className={styles.saveBtn}>Save Changes</Button>
            </Card>
          </motion.div>
        )}

        {activeTab === "security" && (
          <motion.div
            key="security"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card glass className={styles.settingsCard}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Current Password</label>
                <input type="password" className={styles.input} placeholder="••••••••" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>New Password</label>
                <input type="password" className={styles.input} placeholder="Enter new password" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Confirm New Password</label>
                <input type="password" className={styles.input} placeholder="Confirm new password" />
              </div>
              <Button variant="primary" className={styles.saveBtn}>Update Password</Button>

              <div className={styles.dangerZone}>
                  <h3 className={styles.dangerTitle}>Danger Zone</h3>
                  <p className={styles.dangerDesc}>Once you delete your account, there is no going back. Please be certain.</p>
                  <Button variant="outline" style={{ color: 'var(--destructive)', borderColor: 'var(--destructive)' }}>
                      Delete Account
                  </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === "notifications" && (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card glass className={styles.settingsCard}>
              <p className={styles.subtitle}>Coming soon: Granular notification controls for fraud alerts and system status.</p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
