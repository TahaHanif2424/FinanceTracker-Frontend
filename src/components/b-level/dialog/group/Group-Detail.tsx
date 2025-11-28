import React, { useState, useEffect, useRef } from "react";
import { useDialogStore } from "../../../../Store/DialogStore";
import { X, UserPlus, Users, Receipt } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getGroupDetail, type MemberBalance } from "./functions";
import Loader from "../../../c-level/Loader";
import Button from "../../../c-level/Button";

const GroupDetailDialog: React.FC = () => {
  const { closeDialog, dialogData, openDialog } = useDialogStore();
  const groupId = dialogData?.groupId;
  const groupName = dialogData?.groupName;

  // Query to fetch group member balances
  const { data: memberBalances, isLoading, isError } = useQuery<MemberBalance[]>({
    queryKey: ["groupDetail", groupId],
    queryFn: () => getGroupDetail(groupId),
    enabled: !!groupId,
  });

  const handleAddMember = () => {
    // Open add member dialog and pass the current group ID
    openDialog("add_member", { groupId, groupName });
  };

  const handleExpenses = () => {
    // Open expenses dialog and pass the current group ID
    openDialog("group_expenses", { groupId, groupName });
  };

  const formatBalance = (balance: number) => {
    if (balance > 0) {
      return <span className="text-green-600 font-semibold">+Rs {balance.toFixed(2)}</span>;
    } else if (balance < 0) {
      return <span className="text-red-600 font-semibold">-Rs {Math.abs(balance).toFixed(2)}</span>;
    }
    return <span className="text-gray-600 font-semibold">Rs 0.00</span>;
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={closeDialog}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[85vh] flex flex-col overflow-hidden border border-career-lightGray/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-career-darkGreen p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">👥</span>
              {groupName || "Group Details"}
            </h2>
            <button
              onClick={closeDialog}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {memberBalances && memberBalances.length > 0 && (
            <div className="mt-2 flex items-center gap-2 text-white/90">
              <Users className="w-4 h-4" />
              <span className="text-sm">
                {memberBalances.length} {memberBalances.length === 1 ? 'member' : 'members'}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader size="lg" text="Loading group details..." />
            </div>
          ) : isError ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Failed to load group details
              </h3>
              <p className="text-sm text-gray-500">
                There was an error loading the group details. Please try again later.
              </p>
            </div>
          ) : memberBalances ? (
            <div className="space-y-4">
              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <Button onClick={handleExpenses}>
                  <Receipt className="w-4 h-4" />
                  Expenses
                </Button>
                <Button onClick={handleAddMember}>
                  <UserPlus className="w-4 h-4" />
                  Add Member
                </Button>
              </div>

              {/* Member Balances */}
              <div>
                <h3 className="text-base font-bold text-career-darkGreen mb-0">
                  Member Balances
                </h3>

                {memberBalances.length > 0 ? (
                  <div className="space-y-2">
                    {memberBalances.map((member: MemberBalance) => (
                      <div
                        key={member.userId}
                        className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-career-darkGreen transition-all duration-200"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-career-darkGreen rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {member.userName.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-800 text-sm truncate">
                              {member.userName}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{member.userEmail}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pl-13 border-t border-gray-100 pt-2 mt-2">
                          <div className="text-xs">
                            <span className="text-gray-500">Balance: </span>
                            {formatBalance(member.pendingBalance)}
                          </div>
                          <div className="flex gap-3 text-xs">
                            <div>
                              <span className="text-gray-500">Owes: </span>
                              <span className="text-red-600 font-semibold">Rs {member.debt.toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Gets: </span>
                              <span className="text-green-600 font-semibold">Rs {member.receivable.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <Users className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm text-gray-500">No balance information available</p>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GroupDetailDialog;
