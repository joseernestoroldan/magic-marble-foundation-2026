"use client";
import Link from "next/link";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoWarning } from "react-icons/io5";
import UpdateForm from "../auth/updateForm/UpdateForm";
import DangerZone from "../dangerzone/DangerZone";
import styles from "./SettingsTabs.module.css";

type Tab = "account" | "password" | "danger";

const SettingsTabs = ({ data }: { data: any }) => {
  const [activeTab, setActiveTab] = useState<Tab>("account");

  const tabs: { value: Tab; label: string; icon: React.ReactNode; danger?: boolean }[] = [
    { value: "account", label: "Account", icon: <FaUser /> },
    { value: "password", label: "Password", icon: <RiLockPasswordLine /> },
    { value: "danger", label: "Danger Zone", icon: <IoWarning />, danger: true },
  ];

  const tabClasses = (tab: typeof tabs[number]) => {
    const base = styles.tab;
    if (activeTab !== tab.value) return base;
    if (tab.danger) return `${base} ${styles.tabDangerActive}`;
    return `${base} ${styles.tabActive}`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={tabClasses(tab)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.contentPanel}>
        {activeTab === "account" ? (
          <>
            <h2 className={styles.panelTitle}>
              Manage your personal information and preferences
            </h2>
            <UpdateForm data={{ data }} />
          </>
        ) : activeTab === "password" ? (
          <>
            <h2 className={styles.panelTitle}>
              Update your password to keep your account secure
            </h2>
            <div className={styles.resetWrapper}>
              <Link
                className={styles.resetLink}
                href="/reset"
              >
                Reset your password
              </Link>
            </div>
          </>
        ) : (
          <DangerZone data={{ data }} />
        )}
      </div>
    </div>
  );
};

export default SettingsTabs;
