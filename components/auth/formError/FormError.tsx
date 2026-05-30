import { FaExclamationTriangle } from "react-icons/fa";
import styles from "./FormError.module.css";

type ErrorProps = {
  message?: string;
};

export const FormError = ({ message }: ErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <FaExclamationTriangle className={styles.icon} />
      <p>{message}</p>
    </div>
  );
};
