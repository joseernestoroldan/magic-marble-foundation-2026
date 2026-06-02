import { FaUser } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import styles from "./StatusBadges.module.css";

interface StatusBadgesProps {
  data: {
    emailVerified: Date | null;
    role: string;
  };
}

const StatusBadges = ({ data }: StatusBadgesProps) => (
  <div className={styles.wrapper}>
    {data.emailVerified ? (
      <span className={`${styles.badge} ${styles.verified}`}>
        <MdVerifiedUser className={styles.iconLg} />
        Verified
      </span>
    ) : null}
    {data.role === "ADMIN" ? (
      <span className={`${styles.badge} ${styles.admin}`}>
        <RiAdminFill className={styles.iconLg} />
        Admin
      </span>
    ) : (
      <span className={`${styles.badge} ${styles.user}`}>
        <FaUser className={styles.iconSm} />
        User
      </span>
    )}
  </div>
);

export default StatusBadges;
