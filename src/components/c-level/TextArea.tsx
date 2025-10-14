type TextAreaProps = {
  value: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  hasError?: boolean;
  rows?: number;
};

const TextArea: React.FC<TextAreaProps> = ({
  value,
  name,
  onChange,
  onBlur,
  placeholder = "",
  className = "",
  disabled = false,
  required = false,
  hasError = false,
  rows = 3,
}) => {
  const baseClasses = `
    w-full px-4 py-2 text-base border-2 rounded-xl transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-career-mediumGreen/30 resize-none
  `;

  const stateClasses = disabled
    ? "bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300"
    : hasError
      ? "border-red-400 bg-red-50 focus:border-red-500"
      : "border-career-lightGray hover:border-career-mediumGreen focus:border-career-darkGreen bg-white";

  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={`${baseClasses} ${stateClasses} ${className}`}
      required={required}
      rows={rows}
    />
  );
};

export default TextArea;
