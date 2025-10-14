import React from "react";
import GroupItem from "../b-level/Group-item";

type Group = {
  id: string;
  groupName: string;
  amount: number;
  date: string;
  type: "receivable" | "payable";
  groupIcon?: string;
};

type GroupContainerProps = {
  groups?: Group[];
  className?: string;
  showHeader?: boolean;
};

const GroupContainer: React.FC<GroupContainerProps> = ({
  groups = [],
  className = "",
  showHeader = true,
}) => {
  return (
    <div
      className={`
        bg-white
        rounded-xl
        shadow-md
        p-4
        flex
        flex-col
        border border-career-lightGray/20
        ${className}
      `}
    >
      {showHeader && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-career-darkGreen">
            Group Settlements
          </h2>
          <button className="text-sm text-career-darkGreen hover:underline">
            View All
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-3">
        {groups.length > 0 ? (
          groups.map((group) => (
            <GroupItem
              key={group.id}
              amount={group.amount}
              date={group.date}
              groupIcon={group.groupIcon}
              groupName={group.groupName}
              type={group.type}
            />
          ))
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500 text-sm">No group settlements</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupContainer;
