import { Check, X } from "lucide-react";

interface PendingRequestCardProps {
  id: string;
  name: string;
  email: string;
  onAccept: (userId: string) => void;
  onReject?: (userId: string) => void;
  isLoading?: boolean;
}

export default function PendingRequestCard({
  id,
  name,
  email,
  onAccept,
  onReject,
  isLoading = false,
}: PendingRequestCardProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
          {name.charAt(0)}
        </div>
        {/* User Info */}
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-xs text-gray-500">{email}</p>
          <span className="text-xs text-blue-600 font-medium">
            Friend Request
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onAccept(id)}
          disabled={isLoading}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Accept Request"
        >
          <Check className="w-4 h-4" />
        </button>
        {onReject && (
          <button
            onClick={() => onReject(id)}
            disabled={isLoading}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Reject Request"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
