"use client"
import styles from "./Badges.module.css"
import { useState } from "react";
import { Badges as BadgesData } from "@/utils/badges";
import Image from "next/image";

const Badges = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.container} ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.drawer}>
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Badges</span>
          <span className={styles.drawerCount}>{BadgesData.length}</span>
        </div>
        <div className={styles.badgesList}>
          {BadgesData.map((badge, index) => (
            <div
              key={badge.id}
              className={styles.badgeItem}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={styles.badgeImageWrap}>
                <Image
                  src={badge.url}
                  alt={badge.name}
                  width={72}
                  height={72}
                  className={styles.badgeImage}
                />
              </div>
              <span className={styles.badgeName}>
                {badge.name.replace(/_/g, " ")}
              </span>
            </div>
          ))}
        </div>
      </div>
      <button
        className={`${styles.toggle} ${isExpanded ? styles.toggleActive : ""}`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? "Close badges" : "Open badges"}
      >
        <span className={styles.toggleIcon}>{isExpanded ? "▾" : "▸"}</span>
        <span className={styles.toggleLabel}>Badges</span>
      </button>
    </div>
  );
};

export default Badges;
