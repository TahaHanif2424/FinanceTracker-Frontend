import React, { useState } from "react";
import { useDialogStore } from "../../../../Store/DialogStore";
import Button from "../../../c-level/Button";
import Input from "../../../c-level/Input";
import TextArea from "../../../c-level/TextArea";
import { X, Plus, Trash2 } from "lucide-react";

const AddGroupDialog: React.FC = () => {
  const { closeDialog } = useDialogStore();

  const [groupName, setGroupName] = useState("");
  const [groupIcon, setGroupIcon] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState<{ name: string; email: string }[]>([
    { name: "", email: "" },
  ]);

  const handleAddMember = () => {
    setMembers([...members, { name: "", email: "" }]);
  };

  const handleRemoveMember = (index: number) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const handleMemberChange = (
    index: number,
    field: "name" | "email",
    value: string,
  ) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty members
    const validMembers = members.filter((m) => m.name.trim() || m.email.trim());

    const groupData = {
      groupName,
      groupIcon,
      description,
      members: validMembers,
    };

    console.log("Group Data:", groupData);
    // TODO: Add API call to create group

    closeDialog();
  };

  // Popular emoji options for groups
  const emojiOptions = [
    "👥",
    "🎉",
    "✈️",
    "🍔",
    "💪",
    "📚",
    "🎬",
    "🏖️",
    "🎮",
    "⚽",
    "🎵",
    "🍕",
  ];

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
              Create New Group
            </h2>
            <button
              onClick={closeDialog}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]"
        >
          {/* Group Name and Icon */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-career-darkGreen mb-3">
              Group Name *
            </label>
            <Input
              type="text"
              name="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Weekend Trip, Office Lunch"
              required
              className="pl-4"
            />
          </div>

          {/* Icon Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-career-darkGreen mb-3">
              Group Icon
            </label>
            <div className="grid grid-cols-6 gap-3 mb-3">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setGroupIcon(emoji)}
                  className={`
                    p-4 rounded-xl text-2xl transition-all duration-200
                    ${
                      groupIcon === emoji
                        ? "bg-career-darkGreen scale-110 shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200"
                    }
                  `}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <Input
              type="text"
              name="customIcon"
              value={groupIcon}
              onChange={(e) => setGroupIcon(e.target.value)}
              placeholder="Or type your own emoji"
              className="pl-4"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-career-darkGreen mb-2">
              Description (Optional)
            </label>
            <TextArea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description for this group..."
              rows={2}
            />
          </div>

          {/* Members Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-career-darkGreen">
                Members
              </label>
              <button
                type="button"
                onClick={handleAddMember}
                className="
                  flex items-center gap-2 px-4 py-2 rounded-lg
                  bg-career-darkGreen text-white text-sm font-semibold
                  hover:bg-career-darkGreen/90 transition-all duration-200
                "
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {members.map((member, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start bg-gray-50 p-4 rounded-xl border border-gray-200"
                >
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, "name", e.target.value)
                        }
                        placeholder="Member name"
                        className="w-full px-3 py-2 text-sm border-2 rounded-lg border-career-lightGray hover:border-career-mediumGreen focus:border-career-darkGreen focus:outline-none focus:ring-2 focus:ring-career-mediumGreen/30 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) =>
                          handleMemberChange(index, "email", e.target.value)
                        }
                        placeholder="member@email.com"
                        className="w-full px-3 py-2 text-sm border-2 rounded-lg border-career-lightGray hover:border-career-mediumGreen focus:border-career-darkGreen focus:outline-none focus:ring-2 focus:ring-career-mediumGreen/30 transition-all duration-200"
                      />
                    </div>
                  </div>
                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                      className="mt-6 p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
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
              Create Group
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGroupDialog;
