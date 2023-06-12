import React from 'react';
import { Search } from 'tabler-icons-react';

export type SearchInputProps = {
  className?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({
  className,
  placeholder,
  value,
  onChange,
  label,
}: SearchInputProps) {
  return (
    <>
      <div className='px-10 mx-auto'>
        <label
          className='mb-2 text-sm font-medium'
        >
          {label}
        </label>
        <input
          type='search'
          id='default-search'
          className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-2'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}
