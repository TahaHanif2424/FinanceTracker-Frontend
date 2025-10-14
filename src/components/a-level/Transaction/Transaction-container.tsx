import React, { useState, useMemo } from "react";
import TransactionItem from "../../b-level/Transaction-item";
import useTransaction from "./usetransactions";
import { getCategoryIcon } from "../../../utils/categoryIcons";
import type { Transaction as APITransaction } from "./types";
import Loader from "../../c-level/Loader";
import Input from "../../c-level/Input";
import DatePicker from "../../c-level/DatePicker";
import Button from "../../c-level/Button";
import { useDialogStore } from "../../../Store/DialogStore";

type Transaction = {
  id: string;
  name: string;
  date: string;
  time: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  icon?: React.ReactNode;
  description?: string;
  fullDate: string;
};

type TransactionContainerProps = {
  transactions?: Transaction[];
  className?: string;
  showHeader?: boolean;
};

const TransactionContainer: React.FC<TransactionContainerProps> = ({
  className = "",
  showHeader = true,
}) => {
  const { data, isLoading } = useTransaction();
  const { openDialog } = useDialogStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Transform API data to include icons based on category
  const allTransactions = useMemo(() => {
    return (data || []).map((transaction: APITransaction) => {
      const transactionDate = new Date(transaction.date);
      return {
        id: String(transaction.id),
        name: transaction.category,
        date: transactionDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: transactionDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        amount: transaction.amount,
        type: transaction.type,
        icon: getCategoryIcon(transaction.category),
        description: transaction.description,
        fullDate: transaction.date,
      };
    });
  }, [data]);
  // Filter transactions based on search and date range
  const filteredTransactions = useMemo(() => {
    let filtered = allTransactions;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Apply date range filter
    if (startDate && endDate) {
      filtered = filtered.filter((transaction) => {
        const transDate = new Date(transaction.fullDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return transDate >= start && transDate <= end;
      });
    }

    return filtered;
  }, [allTransactions, searchQuery, startDate, endDate]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  // Format date range for display
  const formatDateRange = () => {
    if (filteredTransactions.length === 0) return "";

    const dates = filteredTransactions.map((t) => new Date(t.fullDate));
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    return `${minDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${maxDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  };

  return (
    <div
      className={`
        bg-white
        rounded-xl
        shadow-md
        p-6
        flex
        flex-col
        border border-career-lightGray/20
        h-full
        ${className}
      `}
    >
      {/* Search Bar and Filters */}
      {showHeader && (
        <div className="mb-6">
          {/* Single Row: Search (Left), Date Pickers (Middle), Add Button (Right) */}
          <div className="flex gap-4 items-end">
            {/* Search Bar - Left */}
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-career-mediumGreen w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="🔍 Search transactions..."
              />
            </div>

            {/* Date Range Pickers - Middle */}
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-semibold text-career-darkGreen mb-2">
                  From
                </label>
                <DatePicker
                  name="startDate"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-career-darkGreen mb-2">
                  To
                </label>
                <DatePicker
                  name="endDate"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
            </div>

            {/* Add Transaction Button - Right */}
            <Button
              onClick={() => openDialog("add_transaction")}
              className="whitespace-nowrap cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Transaction
            </Button>
          </div>
        </div>
      )}

      {/* Transaction Count Summary */}
      {!isLoading && filteredTransactions.length > 0 && (
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredTransactions.length} transaction
          {filteredTransactions.length !== 1 ? "s" : ""}{" "}
          {formatDateRange() && `from ${formatDateRange()}`}
        </div>
      )}

      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader size="md" text="Loading transactions..." />
          </div>
        ) : filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction: Transaction) => (
            <TransactionItem
              key={transaction.id}
              id={transaction.id}
              amount={transaction.amount}
              date={transaction.date}
              icon={transaction.icon}
              name={transaction.name}
              time={transaction.time}
              type={transaction.type}
              description={transaction.description}
              fullDate={transaction.fullDate}
            />
          ))
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500 text-sm">
              {searchQuery || startDate || endDate
                ? "No transactions match your filters"
                : "No transactions to display"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionContainer;
