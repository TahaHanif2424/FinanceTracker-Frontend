import React, { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactElement;
  position?: "top" | "right" | "bottom" | "left";
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = "right",
  delay = 200,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  let timeout: ReturnType<typeof setTimeout>;

  const handleMouseEnter = () => {
    timeout = setTimeout(() => {
      setShowTooltip(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeout);
    setShowTooltip(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right":
      default:
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case "top":
        return "top-full left-1/2 transform -translate-x-1/2 border-t-career-darkGreen border-l-transparent border-r-transparent border-b-transparent";
      case "bottom":
        return "bottom-full left-1/2 transform -translate-x-1/2 border-b-career-darkGreen border-l-transparent border-r-transparent border-t-transparent";
      case "left":
        return "left-full top-1/2 transform -translate-y-1/2 border-l-career-darkGreen border-t-transparent border-b-transparent border-r-transparent";
      case "right":
      default:
        return "right-full top-1/2 transform -translate-y-1/2 border-r-career-darkGreen border-t-transparent border-b-transparent border-l-transparent";
    }
  };

  return (
    <div className="relative inline-block">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>

      <div
        className={`absolute z-50 ${getPositionClasses()} pointer-events-none transition-all duration-200 ${
          showTooltip && text ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{
          transitionProperty: "opacity, transform",
        }}
      >
        <div className="relative">
          {/* Tooltip content */}
          <div className="bg-gradient-to-r from-career-darkGreen to-career-mediumGreen text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl backdrop-blur-sm">
            {text}
          </div>
          {/* Arrow */}
          <div
            className={`absolute w-0 h-0 border-[6px] ${getArrowClasses()}`}
            style={{
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
