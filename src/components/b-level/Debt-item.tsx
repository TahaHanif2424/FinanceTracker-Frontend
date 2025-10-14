import React from "react";

type DebtItemProps = {
  userName: string;
  amount: number;
  date: string;
  type: "receivable" | "payable"; // receivable = to receive, payable = to give
  userImage?: string;
  className?: string;
};

const DebtItem: React.FC<DebtItemProps> = ({
  userName,
  amount,
  date,
  type,
  userImage,
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
      {/* Left: User Image */}
      <div className="flex-shrink-0">
        {userImage ? (
          <img
            alt={userName}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            src={userImage}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-career-darkGreen/10 flex items-center justify-center border-2 border-gray-200">
            <span className="text-lg font-semibold text-career-darkGreen">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Middle: User Name, Status & Date */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-800 truncate">
          {userName}
        </h4>
        <p className="text-xs text-gray-600 mt-0.5">
          {isReceivable ? "To Receive" : "To Give"}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{date}</p>
      </div>

      {/* Right: Amount */}
      <div className="flex-shrink-0">
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
      </div>
    </div>
  );
};

export default DebtItem;
