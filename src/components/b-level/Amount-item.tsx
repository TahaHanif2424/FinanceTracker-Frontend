import React from "react";

type AmountItemProps = {
  heading: string;
  amount: string | number;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendPercentage?: number;
  className?: string;
  onClick?: () => void;
};

const AmountItem: React.FC<AmountItemProps> = ({
  heading,
  amount,
  icon,
  trend = "neutral",
  trendPercentage,
  className = "",
  onClick,
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "↑";
      case "down":
        return "↓";
      default:
        return "→";
    }
  };

  return (
    <div
      className={`
        bg-white
        rounded-xl
        p-4
        shadow-md
        hover:shadow-lg
        transition-all
        duration-300
        ease-in-out
        hover:-translate-y-1
        border border-career-lightGray/20
        flex-1
        min-w-[200px]
        max-w-[280px]
        min-h-0
        flex
        flex-col
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2 flex-shrink-0">
        <div className="p-2 bg-career-darkGreen/10 rounded-lg">
          <div className="text-career-darkGreen text-lg">{icon}</div>
        </div>
        {trendPercentage && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold ${getTrendColor()}`}
          >
            <span>{getTrendIcon()}</span>
            <span>{trendPercentage}%</span>
          </div>
        )}
      </div>

      <div className="space-y-1 flex-1 flex flex-col justify-center">
        <h3 className="text-gray-600 text-xs font-medium uppercase tracking-wider">
          {heading}
        </h3>
        <p className="text-xl font-bold text-career-darkGreen">
          {typeof amount === "number"
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(amount)
            : amount}
        </p>
      </div>

      <div className="mt-2 pt-2 border-t border-career-lightGray/30 flex-shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Last updated</span>
          <span className="text-xs text-gray-600 font-medium">Just now</span>
        </div>
      </div>
    </div>
  );
};

export default AmountItem;
