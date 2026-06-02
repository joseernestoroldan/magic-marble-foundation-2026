import Link from "next/link";
import { IoMdSettings } from "react-icons/io";
import styles from "./ProfileHeader.module.css";

const ProfileHeader = () => (
  <div className={styles.header}>
    <h1 className={styles.title}>Profile</h1>
    <Link href="/settings" className={styles.settingsLink}>
      <IoMdSettings className={styles.settingsIcon} />
      Settings
    </Link>
  </div>
);

export default ProfileHeader;
