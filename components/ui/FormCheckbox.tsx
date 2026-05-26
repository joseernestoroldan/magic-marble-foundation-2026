import { UseFormRegisterReturn } from "react-hook-form";

type FormCheckboxProps = {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
};

export const FormCheckbox = ({ id, label, registration }: FormCheckboxProps) => {
  return (
    <div className="flex flex-row items-end space-x-2 pb-1">
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded-[3px] border-gray-300 text-cyan-500 focus:ring-cyan-500"
        {...registration}
      />
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
};
