import { LoginFormData } from "@/ui/signin/signin";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  type?: string;
  label?: string;
  error?: string;
  register: ReturnType<UseFormRegister<any>>;
  icon?: React.ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  label,
  error,
  register,
  icon,
  className = "",
}) => {
  return (
    <div className="relative">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        {...register}
        className={` block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
      />
      {icon && (
        <div className="absolute  top-5 inset-y-0 right-0 pr-3 flex items-center">
          {icon}
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
