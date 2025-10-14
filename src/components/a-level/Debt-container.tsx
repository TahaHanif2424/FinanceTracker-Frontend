import React from "react";
import DebtItem from "../b-level/Debt-item";

type Debt = {
  id: string;
  userName: string;
  amount: number;
  date: string;
  type: "receivable" | "payable";
  userImage?: string;
};

type DebtContainerProps = {
  debts?: Debt[];
  className?: string;
  showHeader?: boolean;
};

const DebtContainer: React.FC<DebtContainerProps> = ({
  debts = [],
  className = "",
  showHeader = true,
}) => {
  return (
    <div
      className={`
        bg-white
        rounded-xl
        shadow-md
        p-4
        flex
        flex-col
        border border-career-lightGray/20
        ${className}
      `}
    >
      {showHeader && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-career-darkGreen">
            Debts & Receivables
          </h2>
          <button className="text-sm text-career-darkGreen hover:underline">
            View All
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-3">
        {debts.length > 0 ? (
          debts.map((debt) => (
            <DebtItem
              key={debt.id}
              amount={debt.amount}
              date={debt.date}
              type={debt.type}
              userImage={debt.userImage}
              userName={debt.userName}
            />
          ))
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500 text-sm">No debts or receivables</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtContainer;
