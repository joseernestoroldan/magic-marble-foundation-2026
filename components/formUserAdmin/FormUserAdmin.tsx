"use client";
import { updateRole } from "@/actions/updateRole";
import { useState } from "react";
import styles from "./FormUserAdmin.module.css";

type FormUserAdminProps = {
  role: "ADMIN" | "USER";
  id: string;
};

enum roles {
  user = "USER",
  admin = "ADMIN",
}

const FormUserAdmin = ({ role, id }: FormUserAdminProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    event.preventDefault();
    setError(null);
    setIsUpdating(true);
    try {
      await updateRole(id, event.target.value);
    } catch {
      setError("Failed to update role");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <select
        name="select"
        id={`role-select-${id}`}
        onChange={handleChange}
        defaultValue={role}
        disabled={isUpdating}
        className={styles.select}
      >
        <option value={roles.admin}>Admin</option>
        <option value={roles.user}>User</option>
      </select>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
};

export default FormUserAdmin;
