import React from "react";

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 bg-career-lightGray/30 p-3 rounded-lg">
      <div className="w-9 h-9 rounded-lg bg-career-darkGreen flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
          {label}
        </div>
        <div>{value}</div>
      </div>
    </div>
  );
};

export default DetailItem;
