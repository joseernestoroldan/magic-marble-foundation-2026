"use client";
import { notifyDiary } from "@/actions/sentDiaries";
import Image from "next/image";
import { useState } from "react";
import { MdMarkEmailRead } from "react-icons/md";
import styles from "./NotifyDiaries.module.css";

const NotifyDiaries = ({ diaries }: any) => {
  const [notifyingId, setNotifyingId] = useState<string | null>(null);

  const handleNotify = async (
    id: string,
    image: string,
    title: string,
    description: string,
    numberNotifications: number
  ) => {
    try {
      setNotifyingId(id);
      await notifyDiary(id, image, title, description, numberNotifications);
    } finally {
      setNotifyingId(null);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>
        Diary Notifications
      </h3>
      <div className={styles.list}>
        {diaries.map((item: any) => {
          const numberNotifications = item.notificationsSent || 0;

          return (
            <div key={item._id} className={styles.item}>
              <div className={styles.imageWrap}>
                <Image
                  src={item.mainImage}
                  alt={item.title || "diary image"}
                  fill
                  className={styles.itemImage}
                />
              </div>

              <p className={styles.title}>
                {item.title}
              </p>

              <span
                className={item.notificationSent ? styles.badgeNotified : styles.badgeNotNotified}
              >
                <MdMarkEmailRead className={styles.badgeIcon} />
                {item.notificationSent ? "Notified" : "Not Notified"}
              </span>

              {numberNotifications > 0 ? (
                <span className={styles.countPositive}>
                  {numberNotifications} sent
                </span>
              ) : (
                <span className={styles.countZero}>
                  0 sent
                </span>
              )}

              <button
                onClick={() =>
                  handleNotify(
                    item._id,
                    item.title,
                    item.mainImage,
                    item.description,
                    numberNotifications
                  )
                }
                disabled={notifyingId === item._id}
                className={styles.notifyButton}
              >
                {notifyingId === item._id
                  ? "Sending..."
                  : item.notificationSent
                    ? "Notify Again"
                    : "Notify"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotifyDiaries;
