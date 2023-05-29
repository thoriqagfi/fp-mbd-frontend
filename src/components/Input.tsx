import * as React from "react";

import { useFormContext } from "react-hook-form";

import { InputProps } from "@/types/input";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Input({
  id,
  titleLabel,
  inputType,
  registerType,
  placeholder,
  errorMessage,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [show, setShow] = React.useState(false);
  return (
    <div className="py-2 h-[88px]">
      <label htmlFor={inputType} className="">{titleLabel}</label>
      <span
        className={`flex bg-white rounded-md border-gray-300 hover:border-gray-400 border-[1px] px-2 py-2`}
      >
        <input
          {...rest}
          {...register(id, registerType)}
          type={id == 'password' ? (show ? "text" : "password") : inputType}
          placeholder={placeholder}
          className="w-full focus:placeholder:opacity-0 focus:outline-none bg-transparent text-gray-900 hover:text-gray-950"
        />
        {id == 'password' && (
          <div
            className="mx-auto my-auto cursor-pointer"
            onClick={() => {
              setShow(!show);
            }}>
            {show ?
              <AiFillEyeInvisible className="text-gray-900 hover:text-gray-950" />
              :
              <AiFillEye className="text-gray-900 hover:text-gray-950" />
            }
          </div>
        )}
      </span>
      <p className="text-red-500 text-[11px] py-0.5">{errorMessage}</p>
    </div>
  );
}