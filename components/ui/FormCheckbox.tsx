import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./FormCheckbox.module.css";

type FormCheckboxProps = {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
};

export const FormCheckbox = ({ id, label, registration }: FormCheckboxProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        id={id}
        type="checkbox"
        className={styles.checkbox}
        {...registration}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};
