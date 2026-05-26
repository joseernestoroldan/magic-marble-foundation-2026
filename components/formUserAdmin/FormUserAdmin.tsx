"use client";
import { updateRole } from "@/actions/updateRole";
import { useState } from "react";

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
    <div className="relative">
      <select
        name="select"
        id={`role-select-${id}`}
        onChange={handleChange}
        defaultValue={role}
        disabled={isUpdating}
        className="appearance-none bg-white border border-gray-200 rounded-[5px] px-3 py-1.5 text-sm text-gray-600 cursor-pointer hover:border-gray-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value={roles.admin}>Admin</option>
        <option value={roles.user}>User</option>
      </select>
      {error ? <p className="text-xs text-red-500 mt-1">{error}</p> : null}
    </div>
  );
};

export default FormUserAdmin;
