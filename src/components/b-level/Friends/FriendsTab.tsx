import { UserMinus } from "lucide-react";
import useFriend from "./useFriend";
import Loader from "../../c-level/Loader";
import UserCard from "../../c-level/UserCard";

export default function FriendsTab() {
  const { friendsData, isLoadingFriends } = useFriend();
  const friends = friendsData || [];

  const handleRemoveFriend = (_friendId: string) => {
    // TODO: Implement remove friend functionality
  };

  if (isLoadingFriends) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* Header with count */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Your Friends</h2>
            <p className="text-sm text-gray-500 mt-1">
              {friends.length} {friends.length === 1 ? "friend" : "friends"}
            </p>
          </div>
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto p-6 min-h-0">
        {friends.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {friends.map((friend: any) => (
              <UserCard
                key={friend.id}
                id={friend.id}
                name={friend.name}
                email={friend.email}
                balance={friend.balance}
                transactions={friend.transactions}
                showBalance={true}
                size="large"
                actionButton={
                  <button
                    onClick={() => handleRemoveFriend(friend.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="Remove Friend"
                  >
                    <UserMinus className="w-4 h-4" />
                  </button>
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No friends yet
            </h3>
            <p className="text-gray-500 text-sm max-w-md">
              Start building your network by finding and adding users from the "Find Users" tab.
              Track shared expenses and manage transactions with your friends!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
