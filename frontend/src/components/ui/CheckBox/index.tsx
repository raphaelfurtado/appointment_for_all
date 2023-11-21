import React, { ChangeEvent, useState } from 'react';

interface CheckboxProps {
  active: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ active, onChange }: CheckboxProps) => {

  const [checked, setChecked] = useState(active);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setChecked(e.target.checked);
    onChange(newValue);
  };

  return (
    <label className="relative inline-flex items-center mb-5 cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={handleChange}
      />
      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 ${checked ? 'peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white' : ''} after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 ${checked ? 'peer-checked:bg-blue-600' : ''}`}
      ></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {checked ? 'Ativo' : 'Inativo'}
      </span>
    </label>
  );
};

export default Checkbox;
