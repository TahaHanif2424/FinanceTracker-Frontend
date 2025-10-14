type ButtonProps = {
  onClick?: () => void;
  className?: string;
  mode?: "simple" | "dead";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  className = "",
  mode = "simple",
  disabled = false,
  type = "button",
  children,
}) => {
  const baseClasses = `
    text-white
    px-6 py-3
    rounded-2xl
    font-semibold
    shadow-md
    transition
    duration-300
    ease-in-out
    flex items-center justify-center gap-2
  `;

  const modeClasses =
    mode === "dead"
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-career-darkGreen hover:bg-career-mediumGreen transform hover:-translate-y-1 hover:shadow-lg";

  return (
    <button
      type={type}
      className={`${baseClasses} ${modeClasses} ${className}`}
      onClick={onClick}
      disabled={disabled || mode === "dead"}
    >
      {children}
    </button>
  );
};

export default Button;
