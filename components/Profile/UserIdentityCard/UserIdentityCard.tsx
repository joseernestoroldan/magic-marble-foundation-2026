import { FcGoogle } from "react-icons/fc";
import styles from "./UserIdentityCard.module.css";

interface UserIdentityCardProps {
  data: {
    name: string | null;
    firstName: string | null;
    secondName: string | null;
    email: string | null;
  };
}

const UserIdentityCard = ({ data }: UserIdentityCardProps) => {
  const displayName = data.name
    ? data.name
    : `${data.firstName ?? ""} ${data.secondName ?? ""}`.trim();

  const initials = data.name
    ? data.name.charAt(0).toUpperCase()
    : `${(data.firstName ?? "").charAt(0)}${(data.secondName ?? "").charAt(0)}`.toUpperCase();

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <span className={styles.initials}>{initials}</span>
      </div>
      <div className={styles.info}>
        <h2 className={styles.displayName}>{displayName}</h2>
        <div className={styles.emailRow}>
          <p className={styles.emailText}>{data.email}</p>
          {data.name ? <FcGoogle className={styles.googleIcon} /> : null}
        </div>
      </div>
    </div>
  );
};

export default UserIdentityCard;
