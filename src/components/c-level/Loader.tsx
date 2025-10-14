import React from "react";

type LoaderProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
};

const Loader: React.FC<LoaderProps> = ({
  size = "md",
  className = "",
  text,
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const dotSizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2.5 h-2.5",
    lg: "w-4 h-4",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Spinning circle */}
        <div className="absolute inset-0 rounded-full border-4 border-career-lightGray/30"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-career-darkGreen border-r-career-mediumGreen animate-spin"></div>

        {/* Center dot */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${dotSizeClasses[size]} bg-career-darkGreen rounded-full animate-pulse`}
        ></div>
      </div>

      {text && (
        <p className="text-sm text-career-darkGreen font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
