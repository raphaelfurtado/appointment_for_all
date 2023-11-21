import React, { useEffect, useState } from 'react';

interface SelectOption {
  id: number;
  name: string;
}

interface SelectProps<T extends SelectOption> {
  value?: number;
  options: T[];
  placeholder: string;
  onChange: (option: T | null) => void;
}

const Select = <T extends SelectOption>({ value, options, placeholder, onChange }: SelectProps<T>) => {

  const [selectedId, setSelectedId] = useState<number | null>(value || null);

  useEffect(() => {
    setSelectedId(value || null); // Atualizar o estado quando o id prop mudar
  }, [value]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find(option => option.id === Number(e.target.value));

    if (selectedOption) {
      setSelectedId(selectedOption.id);
      onChange(selectedOption);
    } else {
      setSelectedId(null);
      onChange(null);
    }
  };

  return (
    <select
      value={value || undefined}
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
