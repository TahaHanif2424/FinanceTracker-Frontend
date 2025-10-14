import { twMerge } from "tailwind-merge";

type InputProps = {
  value: string;
  type: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  hasError?: boolean;
};

const Input: React.FC<InputProps> = ({
  value,
  type,
  name,
  onChange,
  onBlur,
  placeholder = "",
  className = "",
  disabled = false,
  required = false,
  hasError = false,
}) => {
  const baseClasses = `
    w-full pl-12 pr-4 py-2 text-base border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-career-mediumGreen/30
  `;

  const stateClasses = disabled
    ? "bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300"
    : hasError
      ? "border-red-400 bg-red-50 focus:border-red-500"
      : "border-career-lightGray hover:border-career-mediumGreen focus:border-career-darkGreen bg-white";

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={twMerge(baseClasses, stateClasses, className)}
      required={required}
    />
  );
};

export default Input;
