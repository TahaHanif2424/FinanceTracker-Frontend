import { useState } from "react";
import { UserMinus, Mail, DollarSign } from "lucide-react";

// Sample friends data
const sampleFriends = [
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    balance: 150.5,
    transactions: 5,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    balance: -75.25,
    transactions: 3,
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@example.com",
    balance: 0,
    transactions: 2,
  },
];

export default function FriendsList() {
  const [friends, setFriends] = useState(sampleFriends);

  const handleRemoveFriend = (friendId: string) => {
    setFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.id !== friendId),
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Your Friends</h2>
        <p className="text-sm text-gray-500 mt-1">
          {friends.length} {friends.length === 1 ? "friend" : "friends"}
        </p>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-scroll p-4">
        {friends.length > 0 ? (
          <div className="space-y-4">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  {/* Friend Info */}
                  <div className="flex items-start gap-3 flex-1">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-career-darkGreen rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {friend.name.charAt(0)}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {friend.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{friend.email}</span>
                      </div>

                      {/* Balance Info */}
                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span
                            className={`text-sm font-medium ${
                              friend.balance > 0
                                ? "text-green-600"
                                : friend.balance < 0
                                  ? "text-red-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {friend.balance > 0
                              ? `Owes you $${Math.abs(friend.balance).toFixed(2)}`
                              : friend.balance < 0
                                ? `You owe $${Math.abs(friend.balance).toFixed(2)}`
                                : "Settled up"}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {friend.transactions} transactions
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFriend(friend.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 flex-shrink-0"
                    title="Remove Friend"
                  >
                    <UserMinus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No friends yet
            </h3>
            <p className="text-gray-500 text-sm">
              Add friends from the list on the left to start tracking shared
              expenses
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
