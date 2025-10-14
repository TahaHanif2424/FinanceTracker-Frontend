import React, { useState } from "react";
import Button from "../c-level/Button";
import Input from "../c-level/Input";
import DatePicker from "../c-level/DatePicker";
import { useDialogStore } from "../../Store/DialogStore";

type TransactionHeaderProps = {
  onSearchChange?: (search: string) => void;
  onDateRangeChange?: (startDate: string, endDate: string) => void;
};

const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  onSearchChange,
  onDateRangeChange,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDateRange, setShowDateRange] = useState(false);
  const { openDialog } = useDialogStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearchChange?.(e.target.value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    if (endDate) {
      onDateRangeChange?.(e.target.value, endDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    if (startDate) {
      onDateRangeChange?.(startDate, e.target.value);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 border border-career-lightGray/20">
      {/* Main Header Row */}
      <div className="flex gap-4 items-center">
        {/* Search Bar */}
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
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="🔍 Search transactions..."
          />
        </div>

        {/* Date Range Button */}
        <button
          onClick={() => setShowDateRange(!showDateRange)}
          className="px-4 py-2 rounded-xl border-2 border-career-lightGray hover:border-career-mediumGreen bg-white text-career-darkGreen font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          📅 Date Range
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${showDateRange ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Add Transaction Button */}
        <Button
          onClick={() => openDialog("add-transaction")}
          className="whitespace-nowrap"
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

      {/* Date Range Picker (Collapsible) */}
      {showDateRange && (
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 animate-fade-in">
          <div>
            <label className="block text-sm font-semibold text-career-darkGreen mb-2">
              Start Date
            </label>
            <DatePicker
              name="startDate"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-career-darkGreen mb-2">
              End Date
            </label>
            <DatePicker
              name="endDate"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHeader;
