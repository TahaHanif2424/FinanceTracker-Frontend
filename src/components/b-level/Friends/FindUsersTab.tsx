import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import useFriend from "./useFriend";
import Loader from "../../c-level/Loader";
import UserCard from "../../c-level/UserCard";

export default function FindUsersTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [requestSent, setRequestSent] = useState<Set<string>>(new Set());
  const { usersData, isLoadingUsers, sendFriendRequestMutation } = useFriend();
  const users = usersData || [];

  const filteredUsers = users.filter(
    (user: { name: string; email: string }) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddFriend = (userId: string) => {
    sendFriendRequestMutation.mutate(
      { friendId: userId },
      {
        onSuccess: () => {
          setRequestSent((prev) => new Set(prev).add(userId));
        },
        onError: (error: any) => {
          const status = error?.response?.status;
          if (status === 409) {
            alert("Friend request already sent or you're already friends!");
          } else {
            alert("Failed to send friend request. Please try again.");
          }
        },
      }
    );
  };

  if (isLoadingUsers) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* Search Bar */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-career-darkGreen focus:border-transparent"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""} available
        </p>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-6 min-h-0">
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.map((user: any) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                size="small"
                actionButton={
                  requestSent.has(user.id) ? (
                    <span className="px-3 py-1.5 text-sm text-blue-600 font-medium bg-blue-50 rounded-lg">
                      Request Sent
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAddFriend(user.id)}
                      disabled={sendFriendRequestMutation.isPending}
                      className="px-3 py-1.5 bg-career-darkGreen text-white rounded-lg hover:bg-career-darkGreen/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      title="Add Friend"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span className="text-sm font-medium">Add</span>
                    </button>
                  )
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchQuery ? "No users found" : "Start searching"}
            </h3>
            <p className="text-gray-500 text-sm max-w-md">
              {searchQuery
                ? "Try adjusting your search query to find other users"
                : "Use the search bar above to find users by name or email"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
