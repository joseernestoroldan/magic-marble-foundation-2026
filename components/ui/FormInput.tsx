import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./FormInput.module.css";

type FormInputProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  registration: UseFormRegisterReturn;
};

export const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  error,
  disabled = false,
  registration,
}: FormInputProps) => {
  return (
    <div className={styles.wrapper}>
      <label
        htmlFor={id}
        className={styles.label}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.input}
        {...registration}
      />
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : null}
    </div>
  );
};
