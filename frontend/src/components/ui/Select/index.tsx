import React, { useState } from 'react';

interface SelectOption {
  id: number;
  name: string;
}

interface SelectProps<T extends SelectOption> {
  options: T[];
  placeholder: string;
  onChange: (option: T | null) => void;
}

const Select = <T extends SelectOption>({ options, placeholder, onChange }: SelectProps<T>) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find(option => option.id === Number(e.target.value));

    if (selectedOption) {
        onChange(selectedOption);
    } else {
        onChange(null);
    }
  };

  return (
    <select
      onChange={handleSelectChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="" disabled selected>
        {placeholder}
      </option>
      {options.map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
