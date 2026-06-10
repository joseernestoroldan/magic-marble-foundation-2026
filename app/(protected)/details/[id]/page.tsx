import { db } from "@/db";
import { FaCheck } from "react-icons/fa";
import styles from "./page.module.css";

const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await db.user.findUnique({ where: { id } });

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.userSection}>
          <div className={styles.userRow}>
            {user?.name && (
              <h2 className={styles.userName}>{user.name}</h2>
            )}
            {!user?.name && user?.firstName && (
              <h2 className={styles.userNameAlt}>
                {user?.firstName} {user?.secondName}
              </h2>
            )}
          </div>
          <div className={styles.emailRow}>
            <p className={styles.email}>{user?.email}</p>
          </div>
        </div>

        <div className={styles.detailsSection}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Country: </span>
            <p>{user?.country}</p>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Shipping Address:</span>
            <p>{user?.address}</p>
          </div>
        </div>

        <div className={styles.phoneRow}>
          <span className={styles.detailLabel}>Telephone Number: </span>
          <p>
            ({user?.codeNumber}) {user?.number}
          </p>
        </div>

        <div className={styles.subscribedRow}>
          {user?.subscribed ?
            <div className={styles.subscribedBadge}>
              <FaCheck /> <p>User Suscribed to the newsletter</p>
            </div>
          : ""}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
