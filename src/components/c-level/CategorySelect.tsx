import React from "react";

interface CategorySelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
  hasError?: boolean;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  name,
  value,
  onChange,
  options,
  required = false,
  hasError = false,
}) => {
  const baseClasses = `
    w-full pl-4 pr-4 py-2 text-base border-2 rounded-xl transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-career-mediumGreen/30
    appearance-none cursor-pointer
  `;

  const stateClasses = hasError
    ? "border-red-400 bg-red-50 focus:border-red-500"
    : "border-career-lightGray hover:border-career-mediumGreen focus:border-career-darkGreen bg-white";

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`${baseClasses} ${stateClasses}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230F4C5C'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.75rem center",
        backgroundSize: "1.5em 1.5em",
        paddingRight: "2.5rem",
      }}
    >
      <option value="">Select a category</option>
      {options.map((option: string) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
