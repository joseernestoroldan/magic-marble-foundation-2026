import { FaUser } from "react-icons/fa";
import Link from "next/link";
import styles from "./UserNotFound.module.css";

const UserNotFound = () => (
  <div className={styles.wrapper}>
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <FaUser className={styles.icon} />
      </div>
      <h2 className={styles.title}>User profile not found</h2>
      <p className={styles.text}>We couldn&apos;t locate your profile. Please try signing in again.</p>
      <Link href="/login" className={styles.link}>Go to Login</Link>
    </div>
  </div>
);

export default UserNotFound;
