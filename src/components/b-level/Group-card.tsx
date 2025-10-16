import React from "react";

type GroupCardProps = {
  groupName: string;
  groupIcon?: string;
  totalMembers: number;
  memberNames: string[]; // Array of member names, will show first 3
  totalAmount?: number;
  className?: string;
  onClick?: () => void;
};

const GroupCard: React.FC<GroupCardProps> = ({
  groupName,
  groupIcon,
  totalMembers,
  memberNames,
  totalAmount,
  className = "",
  onClick,
}) => {
  // Show only first 3 members
  const displayMembers = memberNames.slice(0, 3);
  const remainingMembers = totalMembers - displayMembers.length;

  return (
    <div
      className={`
        bg-white
        rounded-xl
        p-6
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        ease-in-out
        hover:-translate-y-1
        border border-career-lightGray/20
        flex
        flex-col
        gap-4
        min-h-[220px]
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Header: Icon and Name */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-career-darkGreen/20 to-career-darkGreen/10 flex items-center justify-center border border-career-darkGreen/20">
          {groupIcon ? (
            <span className="text-2xl">{groupIcon}</span>
          ) : (
            <span className="text-xl font-bold text-career-darkGreen">
              {groupName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 truncate">
            {groupName}
          </h3>
          <p className="text-xs text-gray-500">
            {totalMembers} {totalMembers === 1 ? "member" : "members"}
          </p>
        </div>
      </div>

      {/* Members List */}
      <div className="flex-1">
        <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
          Members
        </p>
        <div className="space-y-1.5">
          {displayMembers.map((name, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-career-darkGreen/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-career-darkGreen">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-700 truncate">{name}</span>
            </div>
          ))}
          {remainingMembers > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-gray-600">
                  +{remainingMembers}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {remainingMembers} more
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Total Amount (Optional) */}
      {totalAmount !== undefined && (
        <div className="pt-3 border-t border-career-lightGray/30">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 font-medium">
              Total Amount
            </span>
            <span className="text-sm font-bold text-career-darkGreen">
              Rs.{" "}
              {new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
              }).format(Math.abs(totalAmount))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupCard;
