import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { SelectInputProps } from '@/types/selectInput'

export type Role = {
  Seller: string,
  Customer: string,
}

export default function SelectInput({
  id,
  titleLabel,
  options,
  registerType,
  errorMessage,
}: SelectInputProps) {
  const { register, formState: {errors} } = useFormContext()
  return (
    <div className=''>
      <label htmlFor={id} className="text-gray-900 dark:text-white py-1">
        {titleLabel}
      </label>
      <select
        id={id}
        className="w-full bg-white rounded-md border-gray-300 border-[1px] px-2 py-2 text-gray-900 hover:text-gray-950"
        {...register(id, registerType)}
      >
        {options.map((option, index) => (
          <option key={index} value={option} className="">
            {option}
          </option>
        ))}
      </select>
      <p className="text-red-500 text-sm">{errorMessage}</p>
    </div>
  )
}