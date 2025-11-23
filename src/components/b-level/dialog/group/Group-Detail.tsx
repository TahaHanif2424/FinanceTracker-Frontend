import React from "react";
import { useDialogStore } from "../../../../Store/DialogStore";
import { X, UserPlus, Users } from "lucide-react";
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

  const formatBalance = (balance: number) => {
    if (balance > 0) {
      return <span className="text-green-600 font-semibold">+${balance.toFixed(2)}</span>;
    } else if (balance < 0) {
      return <span className="text-red-600 font-semibold">-${Math.abs(balance).toFixed(2)}</span>;
    }
    return <span className="text-gray-600 font-semibold">$0.00</span>;
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={closeDialog}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden border border-career-lightGray/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-career-darkGreen p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">👥</span>
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
            <div className="mt-3 flex items-center gap-2 text-white/90">
              <Users className="w-4 h-4" />
              <span className="text-sm">
                {memberBalances.length} {memberBalances.length === 1 ? 'member' : 'members'}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader size="lg" text="Loading group details..." />
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⚠️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Failed to load group details
              </h3>
              <p className="text-gray-500">
                There was an error loading the group details. Please try again later.
              </p>
            </div>
          ) : memberBalances ? (
            <div className="space-y-6">
              {/* Add Member Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleAddMember}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Add Member
                </Button>
              </div>

              {/* Member Balances */}
              <div>
                <h3 className="text-lg font-bold text-career-darkGreen mb-4">
                  Member Balances
                </h3>

                {memberBalances.length > 0 ? (
                  <div className="space-y-3">
                    {memberBalances.map((member: MemberBalance) => (
                      <div
                        key={member.userId}
                        className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-career-darkGreen transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-career-darkGreen rounded-full flex items-center justify-center text-white font-bold">
                            {member.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {member.userName}
                            </p>
                            <p className="text-sm text-gray-500">{member.userEmail}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">Pending Balance</p>
                          <div className="mb-2">{formatBalance(member.pendingBalance)}</div>
                          <div className="flex gap-3 text-xs">
                            <div>
                              <span className="text-gray-500">Owes: </span>
                              <span className="text-red-600 font-semibold">${member.debt.toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Gets: </span>
                              <span className="text-green-600 font-semibold">${member.receivable.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500">No balance information available</p>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={closeDialog}
            className="w-full px-6 py-3 rounded-2xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailDialog;
