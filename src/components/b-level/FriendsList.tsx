import { UserMinus } from "lucide-react";
import useFriend from "./Friends/useFriend";
import Loader from "../c-level/Loader";
import UserCard from "../c-level/UserCard";

export default function FriendsList() {
  const { friendsData, isLoadingFriends } = useFriend();
  const friends = friendsData || [];

  const handleRemoveFriend = (friendId: string) => {
  };

  if (isLoadingFriends) {
    return (
      <div className="bg-white rounded-lg shadow-md h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col min-h-0">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-800">Your Friends</h2>
        <p className="text-sm text-gray-500 mt-1">
          {friends.length} {friends.length === 1 ? "friend" : "friends"}
        </p>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {friends.length > 0 ? (
          <div className="space-y-4">
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
