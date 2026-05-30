"use client";
import { chimpType } from "@/clientTypes";
import { useClickOutside } from "@/hooks/useClickOutside";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { FaMailchimp as ChimpIcon } from "react-icons/fa";
import styles from "./ChimpPopover.module.css";

const ChimpPopover = ({ chimpData }: { chimpData: chimpType[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const containerRef = useClickOutside<HTMLButtonElement>(
    useCallback(() => setIsOpen(false), []),
  );

  const formattedData = useMemo(() => {
    return chimpData.map((item) => ({
      ...item,
      date: formatDate(item._createdAt),
    }));
  }, [chimpData]);

  return (
    <button
      className={styles.trigger}
      ref={containerRef}
      onClick={() => {
        setIsOpen(!isOpen);
      }}>
      <ChimpIcon className={styles.icon} />
      <div
        className={`${styles.dropdownBase} ${isOpen ? styles.dropdownOpen : styles.dropdownClosed}`}>
        <div className={styles.dropdownTitle}>
          This Are The Newest Chimps
        </div>
        <div className={styles.dropdownContent}>
          {formattedData.map((item) => {
            if (!item.chimpLink) return null;

            return (
              <div className={styles.item} key={item._id}>
                <p className={styles.itemDate}>
                  {item.date.month} | {item.date.year}:
                </p>
                <Link href={item.chimpLink}>
                  <p className={styles.itemTitle}>
                    {item.title}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </button>
  );
};

export default ChimpPopover;
