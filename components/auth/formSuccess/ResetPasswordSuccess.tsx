import { FaCheckCircle } from "react-icons/fa";
import styles from "./ResetPasswordSuccess.module.css";

type SuccessProps = {
  message?: string;
};

export const ResetPasswordSuccess = ({ message }: SuccessProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <FaCheckCircle className={styles.icon} />
      <p className={styles.message}>{message}</p>
    </div>
  );
};
