import { ReactNode } from "react";
import { Mail, DollarSign } from "lucide-react";

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  balance?: number;
  transactions?: number;
  showBalance?: boolean;
  size?: "small" | "large";
  actionButton?: ReactNode;
}

export default function UserCard({
  name,
  email,
  balance,
  transactions,
  showBalance = false,
  size = "small",
  actionButton,
}: UserCardProps) {
  const avatarSize = size === "large" ? "w-12 h-12" : "w-10 h-10";
  const avatarTextSize = size === "large" ? "text-lg" : "text-base";
  const nameTextSize = size === "large" ? "text-lg" : "text-base";
  const padding = size === "large" ? "p-4" : "p-3";

  return (
    <div
      className={`flex items-start justify-between ${padding} bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200`}
    >
      <div className="flex items-start gap-3 flex-1">
        {/* Avatar */}
        <div
          className={`${avatarSize} bg-career-darkGreen rounded-full flex items-center justify-center text-white font-semibold ${avatarTextSize} flex-shrink-0`}
        >
          {name.charAt(0)}
        </div>

        {/* User Details */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-gray-800 ${nameTextSize}`}>
            {name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <Mail className="w-3 h-3" />
            <span className="truncate">{email}</span>
          </div>

          {/* Balance Info - Only for friends */}
          {showBalance && balance !== undefined && (
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span
                  className={`text-sm font-medium ${
                    balance > 0
                      ? "text-green-600"
                      : balance < 0
                        ? "text-red-600"
                        : "text-gray-600"
                  }`}
                >
                  {balance > 0
                    ? `Owes you $${Math.abs(balance).toFixed(2)}`
                    : balance < 0
                      ? `You owe $${Math.abs(balance).toFixed(2)}`
                      : "Settled up"}
                </span>
              </div>
              {transactions !== undefined && (
                <span className="text-xs text-gray-400">
                  {transactions} transactions
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      {actionButton && <div className="flex-shrink-0">{actionButton}</div>}
    </div>
  );
}
