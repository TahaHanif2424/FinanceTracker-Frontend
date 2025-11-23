import React, { useState, useEffect } from "react";
import { useDialogStore } from "../../../../Store/DialogStore";
import Button from "../../../c-level/Button";
import Input from "../../../c-level/Input";
import { X, UserPlus, Trash2, Check, Loader2 } from "lucide-react";
import useFriend from "../../Friends/useFriend";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMembersToGroup, type AddMemberRequest } from "./functions";

const AddMemberDialog: React.FC = () => {
  const { closeDialog, dialogData, openDialog } = useDialogStore();
  const queryClient = useQueryClient();
  const groupId = dialogData?.groupId;
  const groupName = dialogData?.groupName;

  const { friendsData, isLoadingFriends } = useFriend();
  const friends = friendsData || [];

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mutation to add members to group
  const addMembersMutation = useMutation({
    mutationFn: (data: AddMemberRequest) => addMembersToGroup(data),
    onSuccess: () => {
      // Invalidate group detail query to refresh the member list
      queryClient.invalidateQueries({ queryKey: ["groupDetail", groupId] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });

      // Return to group detail dialog
      openDialog("group_detail", { groupId });
    },
    onError: (error: any) => {
      console.error("Error adding members:", error);
    },
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.friend-search-container')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // Filter friends based on search query and exclude already selected members
  const filteredFriends = friends.filter((friend: any) => {
    const isNotSelected = !selectedMembers.includes(friend.id);

    // If no search query, show all non-selected friends
    if (!searchQuery.trim()) {
      return isNotSelected;
    }

    // If there's a search query, filter by name or email
    const matchesSearch =
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchQuery.toLowerCase());

    return isNotSelected && matchesSearch;
  });

  const handleAddMember = (friendId: string) => {
    setSelectedMembers([...selectedMembers, friendId]);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleRemoveMember = (friendId: string) => {
    setSelectedMembers(selectedMembers.filter((id) => id !== friendId));
  };

  const getSelectedFriends = () => {
    return friends.filter((friend: any) => selectedMembers.includes(friend.id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedMembers.length === 0) {
      console.error("Please select at least one member");
      return;
    }

    await addMembersMutation.mutateAsync({
      groupId,
      userId: selectedMembers,
    });
  };

  const handleCancel = () => {
    // Return to group detail dialog
    openDialog("group_detail", { groupId });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={handleCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden border border-career-lightGray/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-career-darkGreen p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <UserPlus className="w-7 h-7" />
                Add Members
              </h2>
              {groupName && (
                <p className="text-white/80 text-sm mt-1">to {groupName}</p>
              )}
            </div>
            <button
              onClick={handleCancel}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]"
        >
          {/* Members Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-career-darkGreen mb-3">
              Select Members from Friends
            </label>

            {/* Friend Search/Dropdown */}
            <div className="relative mb-4 friend-search-container">
              <div className="relative">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (!showDropdown) setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onClick={() => setShowDropdown(true)}
                  placeholder="Search friends to add..."
                  className="pl-4"
                />
                <UserPlus className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Dropdown */}
              {showDropdown && friends.length >= 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-career-darkGreen rounded-lg shadow-xl max-h-80 overflow-y-auto">
                  {isLoadingFriends ? (
                    <div className="p-6 text-center text-gray-500">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                      <p className="text-sm font-medium">Loading friends...</p>
                    </div>
                  ) : filteredFriends.length > 0 ? (
                    <>
                      {/* Show count of available friends */}
                      <div className="sticky top-0 bg-career-darkGreen text-white px-4 py-2 text-sm font-semibold">
                        {filteredFriends.length} {filteredFriends.length === 1 ? "friend" : "friends"} available
                      </div>

                      {/* Friend list */}
                      <div className="divide-y divide-gray-100">
                        {filteredFriends.map((friend: any) => (
                          <button
                            key={friend.id}
                            type="button"
                            onClick={() => handleAddMember(friend.id)}
                            className="w-full px-4 py-3 text-left hover:bg-green-50 transition-all duration-200 group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-career-darkGreen rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-200">
                                {friend.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-800 group-hover:text-career-darkGreen transition-colors">
                                  {friend.name}
                                </p>
                                <p className="text-sm text-gray-500">{friend.email}</p>
                              </div>
                              <UserPlus className="w-5 h-5 text-gray-400 group-hover:text-career-darkGreen transition-colors" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <UserPlus className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm font-medium">
                        {friends.length === 0
                          ? "You don't have any friends yet"
                          : searchQuery
                          ? `No friends found matching "${searchQuery}"`
                          : "All friends have been added"}
                      </p>
                      {friends.length === 0 && (
                        <p className="text-xs text-gray-400 mt-2">
                          Add friends first from the Friends page!
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected Members */}
            {getSelectedFriends().length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  Selected Members ({getSelectedFriends().length})
                </p>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {getSelectedFriends().map((friend: any) => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-career-darkGreen rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {friend.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">
                            {friend.name}
                          </p>
                          <p className="text-xs text-gray-500">{friend.email}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(friend.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
                        title="Remove member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              disabled={addMembersMutation.isPending}
              className="flex-1 px-6 py-3 rounded-2xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <Button
              type="submit"
              disabled={addMembersMutation.isPending || selectedMembers.length === 0}
              className="flex-1"
            >
              {addMembersMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Add Members
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberDialog;
