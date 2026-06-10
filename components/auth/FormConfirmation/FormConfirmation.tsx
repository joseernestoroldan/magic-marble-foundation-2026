import { FaCheckCircle } from "react-icons/fa";
import styles from "./FormConfirmation.module.css";

type ConfirmationProps = {
  message?: string;
};

export const FormConfirmation = ({ message }: ConfirmationProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <FaCheckCircle className={styles.icon} />
      <p>{message}</p>
    </div>
  );
};
