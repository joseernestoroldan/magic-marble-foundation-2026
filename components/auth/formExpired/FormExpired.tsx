import { resendVerification } from "@/actions/resendVerification";
import { IoAlertCircle } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormError } from "../FormError/FormError";
import { ResetPasswordSuccess } from "../formSuccess/ResetPasswordSuccess";
import styles from "./FormExpired.module.css";

type ExpiredProps = {
  message?: string;
};

export const FormExpired = ({ message }: ExpiredProps) => {
  const[error, setError] = useState<string | undefined>()
  const[success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleClick = () => {
    resendVerification(token)
    .then((data) => {
        setError(data.error)
        setSuccess(data.success)
    })
  }

  if (!message) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <IoAlertCircle className={styles.icon} />
      <p className={styles.message}>{message}</p>
      <p>Click on the link bellow and we will send you another one.</p>

      <button
        className={styles.resendButton}
        onClick={() => handleClick()}
      >
        Get a confirmation Email
      </button>
      <FormError message={error}/>
      <ResetPasswordSuccess message={success}/>
    </div>
  );
};
