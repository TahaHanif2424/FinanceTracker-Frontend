import React from "react";

interface TypeToggleButtonProps {
  type: "INCOME" | "EXPENSE";
  selectedType: "INCOME" | "EXPENSE";
  onClick: () => void;
}

const TypeToggleButton: React.FC<TypeToggleButtonProps> = ({
  type,
  selectedType,
  onClick,
}) => {
  const isExpense = type === "EXPENSE";
  const isSelected = selectedType === type;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        p-4 rounded-xl font-semibold transition-all duration-300 border-2
        ${
          isSelected
            ? isExpense
              ? "bg-red-50 border-red-500 text-red-700 shadow-md"
              : "bg-green-50 border-green-500 text-green-700 shadow-md"
            : "bg-gray-50 border-gray-200 text-gray-600 " +
              (isExpense ? "hover:border-red-300" : "hover:border-green-300")
        }
      `}
    >
      <span className="text-2xl mb-2 block">{isExpense ? "💸" : "💰"}</span>
      {type}
    </button>
  );
};

export default TypeToggleButton;
