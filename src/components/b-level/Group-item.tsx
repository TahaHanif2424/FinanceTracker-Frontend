import React from "react";

type GroupItemProps = {
  groupName: string;
  amount: number;
  date: string;
  type: "receivable" | "payable"; // receivable = to receive, payable = to give
  groupIcon?: string;
  className?: string;
};

const GroupItem: React.FC<GroupItemProps> = ({
  groupName,
  amount,
  date,
  type,
  groupIcon,
  className = "",
}) => {
  const isReceivable = type === "receivable";

  return (
    <div
      className={`
        bg-white
        rounded-lg
        p-4
        shadow-sm
        hover:shadow-md
        transition-all
        duration-200
        border border-career-lightGray/20
        flex
        items-center
        justify-between
        gap-4
        ${className}
      `}
    >
      {/* Left: Group Icon and Name */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-career-darkGreen/20 to-career-darkGreen/10 flex items-center justify-center border border-career-darkGreen/20">
            {groupIcon ? (
              <span className="text-xl">{groupIcon}</span>
            ) : (
              <span className="text-lg font-semibold text-career-darkGreen">
                {groupName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-800 truncate">
            {groupName}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">{date}</p>
        </div>
      </div>

      {/* Right: Amount and Status */}
      <div className="flex-shrink-0 text-right">
        <p
          className={`text-sm font-bold ${
            isReceivable ? "text-green-600" : "text-red-600"
          }`}
        >
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }).format(Math.abs(amount))}
        </p>
        <p className="text-xs text-gray-600 mt-0.5">
          {isReceivable ? "To Receive" : "To Give"}
        </p>
      </div>
    </div>
  );
};

export default GroupItem;
