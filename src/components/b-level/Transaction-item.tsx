import React from "react";
import { useDialogStore } from "../../Store/DialogStore";
import { Pencil, Trash2 } from "lucide-react";
import { deleteTransaction } from "../a-level/Transaction/function";
import { useQueryClient } from "@tanstack/react-query";
import { useDataStore } from "../../Store/DataStore";

type TransactionItemProps = {
  id: string;
  name: string;
  date: string;
  time: string;
  amount: number;
  type?: "INCOME" | "EXPENSE";
  icon?: React.ReactNode;
  className?: string;
  description?: string;
  fullDate?: string;
};

const TransactionItem: React.FC<TransactionItemProps> = ({
  id,
  name,
  date,
  time,
  amount,
  type = "EXPENSE",
  icon,
  className = "",
  description = "",
  fullDate,
}) => {
  const isExpense = type === "EXPENSE";
  const dialog = useDialogStore();
  const queryClient = useQueryClient();
  const { userId } = useDataStore();
  const open = () => {
    dialog.openDialog("transaction_detail", {
      amount,
      type,
      category: name,
      date: fullDate || date,
      description: description || "",
    });
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dialog.openDialog("confirm_delete", {
      title: "Delete Transaction",
      message: `Are you sure you want to delete the transaction "${name}"? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          await deleteTransaction(id);
          // Invalidate and refetch transactions
          queryClient.invalidateQueries({ queryKey: ["transactions", userId] });
          dialog.closeDialog();
        } catch (error) {
          console.error("Failed to delete transaction:", error);
          dialog.closeDialog();
        }
      },
    });
  };

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
        group
        ${className}
      `}
    >
      {/* Left: Icon */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-career-darkGreen/10 flex items-center justify-center">
          {icon || <span className="text-lg">{isExpense ? "💸" : "💰"}</span>}
        </div>
      </div>

      {/* Middle: Name, Date & Time - Clickable */}
      <div
        className="flex-1 min-w-0 cursor-pointer"
        onClick={() => {
          open();
        }}
      >
        <h4 className="text-sm font-semibold text-gray-800 truncate">{name}</h4>
        <p className="text-xs text-gray-500 mt-0.5">
          {date} • {time}
        </p>
      </div>

      {/* Right: Amount & Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Amount */}
        <p
          className={`text-sm font-bold ${
            isExpense ? "text-red-600" : "text-green-600"
          }`}
        >
          {isExpense ? "-" : "+"}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }).format(Math.abs(amount))}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Edit Button */}
          <button
            onClick={handleEdit}
            className="p-2 rounded-lg bg-career-lightGreen hover:bg-career-mediumGreen/20 text-career-darkGreen transition-all duration-200 hover:scale-110"
            title="Edit transaction"
          >
            <Pencil className="w-4 h-4" />
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-200 hover:scale-110"
            title="Delete transaction"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
