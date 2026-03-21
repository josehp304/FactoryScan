"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../login/page.module.css";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Building2, Globe, CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth/client";

export default function ProfileSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [industry, setIndustry] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create organization using better-auth client
      await authClient.organization.create({
        name: orgName,
        slug: orgName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        // metadata might be supported based on better-auth plugin config
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to create organization:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card glass className={styles.authCard}>
        <div className={styles.header}>
          <div className={styles.iconSuccessWrapper}>
            <CheckCircle2 className={styles.iconSuccess} />
          </div>
          <h1 className={styles.title}>Complete Profile</h1>
          <p className={styles.subtitle}>Tell us about your organization to tailor your fraud protection.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Organization Name</label>
            <div className={styles.inputWrapper}>
              <Building2 className={styles.inputIcon} size={18} />
              <input 
                type="text" 
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Acme Corp" 
                className={styles.input} 
                required 
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Website URL</label>
            <div className={styles.inputWrapper}>
              <Globe className={styles.inputIcon} size={18} />
              <input 
                type="url" 
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://acme.com" 
                className={styles.input} 
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Industry / Use Case</label>
            <select 
              className={styles.select} 
              required
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="" disabled>Select an industry...</option>
              <option value="ecommerce">eCommerce & Retail</option>
              <option value="education">Education & Universities</option>
              <option value="finance">Banking & Finance</option>
              <option value="subscription">SaaS & Subscriptions</option>
            </select>
          </div>

          <Button size="lg" className={styles.submitBtn} disabled={loading}>
            {loading ? "Setting up..." : "Complete Setup & Go to Dashboard"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
