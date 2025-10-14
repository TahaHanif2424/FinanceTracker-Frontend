import React, { useState } from "react";
import { useDialogStore } from "../../../../Store/DialogStore";
import Button from "../../../c-level/Button";
import Input from "../../../c-level/Input";
import useBalance from "../../Balance/useBalance";
import { useDataStore } from "../../../../Store/DataStore";

const AddBalanceDialog: React.FC = () => {
  const { closeDialog } = useDialogStore();
  const { userId } = useDataStore();
  const [balance, setBalance] = useState("");
  const { balanceMutation } = useBalance();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    balanceMutation.mutate({ balance: parseFloat(balance), userId });
    closeDialog();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={closeDialog}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-career-lightGray/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-career-darkGreen p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">💰</span>
              Update Total Balance
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
        <form onSubmit={handleSubmit} className="p-6">
          {/* Balance Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-career-darkGreen mb-2">
              Total Balance *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                Rs
              </span>
              <Input
                type="number"
                name="balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="0.00"
                className="pl-10"
                required
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Enter your current total balance
            </p>
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
              Update Balance
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBalanceDialog;
