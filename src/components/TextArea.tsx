import React from "react";
import { useFormContext } from "react-hook-form";

interface TextareaProps {
  id: string;
  titleLabel: string;
  registerType?: any; // Replace `any` with the appropriate type for your use case
  placeholder?: string;
  errorMessage?: string;
  [key: string]: any;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  titleLabel,
  registerType,
  placeholder,
  errorMessage,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="py-2">
      <label htmlFor={id}>{titleLabel}</label>
      <textarea
        {...rest}
        {...register(id, registerType)}
        id={id}
        placeholder={placeholder}
        className="w-full focus:outline-none bg-white text-gray-900 hover:text-gray-950 p-2"
      />
      {errors[id] && (
        <p className="text-red-500 text-[11px] py-0.5">{errorMessage}</p>
      )}
    </div>
  );
};

export default Textarea;
