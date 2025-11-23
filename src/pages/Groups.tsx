import { Plus } from "lucide-react";
import GroupCard from "../components/b-level/Group-card";
import Loader from "../components/c-level/Loader";
import { CONTENT_HEIGHT } from "../utils/constants";
import { useDialogStore } from "../Store/DialogStore";
import useGroup from "../components/b-level/dialog/group/useGroup";
import type { GroupResponse, GroupMember, TransformedGroup } from "../components/b-level/dialog/group/functions";

export default function Groups() {
  const { openDialog } = useDialogStore();
  const { groupsData, isLoadingGroups, isErrorGroups } = useGroup();

  const handleAddGroup = () => {
    // Open dialog to add a new group
    openDialog("add_group");
  };

  const handleGroupClick = (groupId: string) => {
    // Find the group to get its name
    const group = groupsData?.find((g: GroupResponse) => g.id === groupId);
    // Open group detail dialog
    openDialog("group_detail", { groupId, groupName: group?.name });
  };

  // Transform backend data to match GroupCard props
  const transformedGroups: TransformedGroup[] = groupsData?.map((group: GroupResponse) => ({
    id: group.id,
    groupName: group.name,
    groupIcon: group.icon,
    totalMembers: group.members?.length || 0,
    memberNames: group.members?.map((member: string | GroupMember) =>
      typeof member === 'string' ? member : (member.name || member.userName || member.email)
    ) || [],
    totalAmount: group.totalAmount,
  })) || [];

  return (
    <div className="p-6 bg-gray-50" style={{ height: CONTENT_HEIGHT }}>
      <div className="flex flex-col h-full gap-6">
        {/* Header with Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-career-darkGreen">Groups</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your group expenses and settlements
            </p>
          </div>
          <button
            onClick={handleAddGroup}
            className="
              flex items-center gap-2
              bg-career-darkGreen
              hover:bg-career-darkGreen/90
              text-white
              px-6 py-3
              rounded-lg
              font-semibold
              transition-all
              duration-200
              shadow-md
              hover:shadow-lg
              hover:-translate-y-0.5
            "
          >
            <Plus className="w-5 h-5" />
            Add Group
          </button>
        </div>

        {/* Groups Grid */}
        <div className="flex-1 overflow-y-auto">
          {isLoadingGroups ? (
            <div className="flex items-center justify-center h-full">
              <Loader size="lg" text="Loading groups..." />
            </div>
          ) : isErrorGroups ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">⚠️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Failed to load groups
                </h3>
                <p className="text-gray-500 mb-6">
                  There was an error loading your groups. Please try again later.
                </p>
              </div>
            </div>
          ) : transformedGroups.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 pb-4">
              {transformedGroups.map((group: TransformedGroup) => (
                <GroupCard
                  key={group.id}
                  groupName={group.groupName}
                  groupIcon={group.groupIcon}
                  totalMembers={group.totalMembers}
                  memberNames={group.memberNames}
                  totalAmount={group.totalAmount}
                  onClick={() => handleGroupClick(group.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No groups yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Create your first group to start tracking shared expenses
                </p>
                <button
                  onClick={handleAddGroup}
                  className="
                    inline-flex items-center gap-2
                    bg-career-darkGreen
                    hover:bg-career-darkGreen/90
                    text-white
                    px-6 py-3
                    rounded-lg
                    font-semibold
                    transition-all
                    duration-200
                  "
                >
                  <Plus className="w-5 h-5" />
                  Create Group
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
