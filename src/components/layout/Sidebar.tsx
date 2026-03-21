"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import { 
  LayoutDashboard, 
  Key, 
  Settings, 
  LifeBuoy, 
  User, 
  LogOut,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Support", href: "/dashboard/support", icon: LifeBuoy },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoArea}>
        <ShieldCheck className={styles.logo} size={32} />
        <span className={styles.logoText}>Factory Scan</span>
      </div>

      <nav className={styles.navSection}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(styles.navItem, isActive && styles.activeNavItem)}
            >
              <Icon className={styles.navIcon} />
              <span>{item.label}</span>
              {isActive && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>AP</div>
          <div className={styles.profileInfo}>
            <p className={styles.profileName}>Akshay P</p>
            <p className={styles.profileEmail}>akshay@factoryscan.io</p>
          </div>
        </div>
        
        <Link href="/login" className={styles.logoutBtn}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
