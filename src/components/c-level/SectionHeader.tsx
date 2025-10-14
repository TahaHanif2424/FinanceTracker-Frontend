import React from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionText,
  onActionClick,
  className = "",
}) => {
  return (
    <div className={`mb-4 flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-career-darkGreen">{title}</h2>
        {subtitle && (
          <span className="px-3 py-1 text-xs font-medium text-career-darkGreen bg-career-lightGray/50 border border-career-mediumGreen/30 rounded-full">
            {subtitle}
          </span>
        )}
      </div>
      {actionText && onActionClick && (
        <button
          onClick={onActionClick}
          className="text-sm text-career-darkGreen hover:underline transition-all duration-200"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
