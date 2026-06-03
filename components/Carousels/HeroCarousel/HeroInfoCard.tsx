"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import styles from "./HeroInfoCard.module.css";

interface HeroInfoCardProps {
  title: string;
  description: string;
  url: string;
}

const HeroInfoCard = ({ title, description, url }: HeroInfoCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = useCallback(() => setIsExpanded(true), []);
  const handleMouseLeave = useCallback(() => setIsExpanded(false), []);

  return (
    <div
      className={`${styles.card} ${isExpanded ? styles.cardExpanded : styles.cardCollapsed}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className={styles.title}>{title}</h2>

      <p
        className={`${styles.description} ${isExpanded ? styles.descriptionExpanded : styles.descriptionCollapsed}`}
      >
        {description}
      </p>

      <Link
        href={`/projects/project/${url}`}
        className={`${styles.link} ${isExpanded ? styles.linkVisible : styles.linkHidden}`}
      >
        Learn More
      </Link>
    </div>
  );
};

export default HeroInfoCard;
