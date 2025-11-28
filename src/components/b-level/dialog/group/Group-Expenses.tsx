import React, { useState, useEffect } from "react";
import { useDialogStore } from "../../../../Store/DialogStore";
import { ArrowLeft, Save, Wallet } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getGroupDetail, updateMemberExpense, type MemberBalance } from "./functions";
import Loader from "../../../c-level/Loader";

interface EditableMember extends MemberBalance {
  editedDebt: number;
  editedReceivable: number;
  isSaving: boolean;
  hasChanges: boolean;
}

const GroupExpensesDialog: React.FC = () => {
  const { closeDialog, dialogData, openDialog } = useDialogStore();
  const queryClient = useQueryClient();
  const groupId = dialogData?.groupId;
  const groupName = dialogData?.groupName;

  const handleBack = () => {
    openDialog("group_detail", { groupId, groupName });
  };

  const [editableMembers, setEditableMembers] = useState<EditableMember[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: memberBalances, isLoading, isError } = useQuery<MemberBalance[]>({
    queryKey: ["groupDetail", groupId],
    queryFn: () => getGroupDetail(groupId),
    enabled: !!groupId,
  });

  // Initialize editable state only on first load
  useEffect(() => {
    if (memberBalances && !isInitialized) {
      setEditableMembers(
        memberBalances.map((member) => ({
          ...member,
          editedDebt: member.debt,
          editedReceivable: member.receivable,
          isSaving: false,
          hasChanges: false,
        }))
      );
      setIsInitialized(true);
    }
  }, [memberBalances, isInitialized]);

  const updateMutation = useMutation({
    mutationFn: ({ userId, debt, receivable }: { userId: string; debt: number; receivable: number }) =>
      updateMemberExpense(groupId, userId, debt, receivable),
    onSuccess: (_, variables) => {
      // Update local state to reflect saved changes
      setEditableMembers((prev) =>
        prev.map((member) =>
          member.userId === variables.userId
            ? {
                ...member,
                debt: variables.debt,
                receivable: variables.receivable,
                isSaving: false,
                hasChanges: false,
              }
            : member
        )
      );
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["groupDetail", groupId] });
    },
    onError: (_, variables) => {
      // Reset saving state on error
      setEditableMembers((prev) =>
        prev.map((member) =>
          member.userId === variables.userId ? { ...member, isSaving: false } : member
        )
      );
    },
  });

  const handleDebtChange = (userId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setEditableMembers((prev) =>
      prev.map((member) =>
        member.userId === userId
          ? {
              ...member,
              editedDebt: numValue,
              hasChanges: numValue !== member.debt || member.editedReceivable !== member.receivable,
            }
          : member
      )
    );
  };

  const handleReceivableChange = (userId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setEditableMembers((prev) =>
      prev.map((member) =>
        member.userId === userId
          ? {
              ...member,
              editedReceivable: numValue,
              hasChanges: member.editedDebt !== member.debt || numValue !== member.receivable,
            }
          : member
      )
    );
  };

  const handleSave = (member: EditableMember) => {
    setEditableMembers((prev) =>
      prev.map((m) => (m.userId === member.userId ? { ...m, isSaving: true } : m))
    );
    updateMutation.mutate({
      userId: member.userId,
      debt: member.editedDebt,
      receivable: member.editedReceivable,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={handleBack}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[85vh] flex flex-col overflow-hidden border border-career-lightGray/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-career-darkGreen p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Wallet className="w-6 h-6" />
              Group Expenses
            </h2>
            <button
              onClick={handleBack}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-1">{groupName}</p>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader size="lg" text="Loading expenses..." />
            </div>
          ) : isError ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Failed to load expenses
              </h3>
              <p className="text-sm text-gray-500">
                Please try again later.
              </p>
            </div>
          ) : editableMembers.length > 0 ? (
            <div className="space-y-3">
              {editableMembers.map((member) => (
                <div
                  key={member.userId}
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                >
                  {/* Member Info */}
                  <div className="flex items-center gap-3 mb-3">
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

                  {/* Editable Fields */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Owes (Debt)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">Rs</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={member.editedDebt}
                          onChange={(e) => handleDebtChange(member.userId, e.target.value)}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-career-darkGreen focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Gets (Receivable)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">Rs</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={member.editedReceivable}
                          onChange={(e) => handleReceivableChange(member.userId, e.target.value)}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-career-darkGreen focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={() => handleSave(member)}
                    disabled={!member.hasChanges || member.isSaving}
                    className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      member.hasChanges && !member.isSaving
                        ? "bg-career-darkGreen text-white hover:bg-career-mediumGreen"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {member.isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Wallet className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              <p className="text-sm text-gray-500">No members in this group</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupExpensesDialog;
