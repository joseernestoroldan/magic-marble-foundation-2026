import { auth } from "@/auth";
import SettingsTabs from "@/components/settingsTabs/SettingsTabs";
import { db } from "@/db";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import styles from "./page.module.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });

const SettingsPage = async () => {
  const session = await auth();
  const userId = session?.user.id;

  const data = await db.user.findFirst({ where: { id: userId } });

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <nav className={styles.breadcrumb}>
          <Link
            href="/profile"
            className={styles.breadcrumbLink}
          >
            Profile
          </Link>
          <span className={styles.breadcrumbSeparator}>&#8250;</span>
          <span className={styles.breadcrumbCurrent}>Settings</span>
        </nav>
        <div className={styles.titleRow}>
          <div className={styles.titleAccent} />
          <h1 className={styles.title}>
            Settings
            <span className={`${styles.titleSerif} ${playfair.className}`}>preferences</span>
          </h1>
        </div>
      </div>

      <div className={styles.contentCard}>
        {data ? (
          <SettingsTabs data={data} />
        ) : (
          <div className={styles.emptyState}>
            <svg className={styles.emptyIcon} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className={styles.emptyTitle}>Unable to load your data</p>
            <p className={styles.emptyText}>
              Please try again later or{" "}
              <Link href="/profile" className={styles.emptyLink}>
                return to your profile
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
