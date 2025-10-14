import React from "react";
import { useDialogStore } from "../../../../Store/DialogStore";
import Button from "../../../c-level/Button";
import Input from "../../../c-level/Input";
import TextArea from "../../../c-level/TextArea";
import TypeToggleButton from "../../../c-level/TypeToggleButton";
import CategorySelect from "../../../c-level/CategorySelect";
import DatePicker from "../../../c-level/DatePicker";
import TimePicker from "../../../c-level/TimePicker";
import useTransaction from "../../../a-level/Transaction/usetransactions";

const AddTransactionDialog: React.FC = () => {
  const { closeDialog } = useDialogStore();
  const { formik } = useTransaction();

  const categories = {
    EXPENSE: [
      "🛒 Groceries",
      "☕ Food & Drinks",
      "⚡ Utilities",
      "🚗 Transport",
      "🎮 Entertainment",
      "🏥 Healthcare",
      "📚 Education",
      "🛍️ Shopping",
      "🏠 Rent",
      "💼 Other",
    ],
    INCOME: [
      "💵 Salary",
      "💰 Investment",
      "🎁 Gift",
      "📈 Bonus",
      "💳 Refund",
      "💼 Other",
    ],
  };

  const handleTypeChange = (type: "INCOME" | "EXPENSE") => {
    formik.setFieldValue("type", type);
    formik.setFieldValue("category", "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
    closeDialog();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={closeDialog}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-career-lightGray/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className=" bg-career-darkGreen p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">💳</span>
              Add Transaction
            </h2>
            <button
              onClick={closeDialog}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]"
        >
          {/* Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-career-darkGreen mb-3">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <TypeToggleButton
                type="EXPENSE"
                selectedType={formik.values.type}
                onClick={() => handleTypeChange("EXPENSE")}
              />
              <TypeToggleButton
                type="INCOME"
                selectedType={formik.values.type}
                onClick={() => handleTypeChange("INCOME")}
              />
            </div>
          </div>

          {/* Amount */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-career-darkGreen mb-2">
              Amount *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                Rs
              </span>
              <Input
                type="number"
                name="amount"
                value={formik.values.amount.toString()}
                onChange={formik.handleChange}
                placeholder="0.00"
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-career-darkGreen mb-2">
              Category *
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <CategorySelect
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  options={categories[formik.values.type]}
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => alert("Custom category feature coming soon!")}
                className="
                  px-4 py-3 rounded-2xl font-semibold
                  bg-career-darkGreen text-white
                  hover:bg-career-mediumGreen
                  transition-all duration-300
                  shadow-sm hover:shadow-md
                  flex items-center gap-2
                  whitespace-nowrap
                "
                title="Create custom category"
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
                Custom
              </button>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-semibold text-career-darkGreen mb-2">
                Date *
              </label>
              <DatePicker
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-career-darkGreen mb-2">
                Time *
              </label>
              <TimePicker
                name="time"
                value={formik.values.time}
                onChange={formik.handleChange}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-career-darkGreen mb-2">
              Description (Optional)
            </label>
            <TextArea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Add notes about this transaction..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={closeDialog}
              className="flex-1 px-6 py-3 rounded-2xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
            <Button type="submit" className="flex-1">
              <span className="text-lg">✓</span>
              Add Transaction
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionDialog;
