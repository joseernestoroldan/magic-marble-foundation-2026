import { resendVerification } from "@/actions/resendVerification";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormError } from "../FormError/FormError";
import { FormSuccess } from "../formSuccess/FormSuccess";
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
      <AlertCircle className={styles.icon} />
      <p className={styles.message}>{message}</p>
      <p>Click on the link bellow and we will send you another one.</p>

      <button
        className={styles.resendButton}
        onClick={() => handleClick()}
      >
        Get a confirmation Email
      </button>
      <FormError message={error}/>
      <FormSuccess message={success}/>
    </div>
  );
};
