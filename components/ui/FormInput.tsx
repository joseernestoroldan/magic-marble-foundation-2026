import { UseFormRegisterReturn } from "react-hook-form";

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
    <div>
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="flex h-10 w-full rounded-[5px] border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200"
        {...registration}
      />
      {error ? (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      ) : null}
    </div>
  );
};
