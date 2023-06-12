import * as React from 'react';

interface CheckboxProps {
  selected: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export default function Checkbox({
  selected,
  onChange,
  label,
}: CheckboxProps) {
  return (
    <div className='mx-2 flex gap-x-2 my-1'>
      <input
        type="checkbox"
        name={label}
        id={label}
        checked={selected}
        onChange={onChange}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  )
}