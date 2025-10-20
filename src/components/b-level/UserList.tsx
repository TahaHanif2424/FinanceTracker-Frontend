import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import useFriend from "./Friends/useFriend";
import Loader from "../c-level/Loader";
import UserCard from "../c-level/UserCard";
import PendingRequestCard from "../c-level/PendingRequestCard";

export default function UserList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [requestSent, setRequestSent] = useState<Set<string>>(new Set());
  const {
    usersData,
    isLoadingUsers,
    pendingRequestsData,
    isLoadingPendingRequests,
    sendFriendRequestMutation,
    acceptFriendRequestMutation,
  } = useFriend();
  const users = usersData || [];
  const pendingRequests = pendingRequestsData || [];


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

  const handleAcceptRequest = (userId: string) => {
    acceptFriendRequestMutation.mutate(
      { friendId: userId },
      {
        onSuccess: () => {
          alert("Friend request accepted!");
        },
        onError: (error: any) => {
          alert("Failed to accept friend request. Please try again.");
        },
      }
    );
  };

  if (isLoadingUsers) {
    return (
      <div className="bg-white rounded-lg shadow-md h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col min-h-0">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-career-darkGreen focus:border-transparent"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <div className="space-y-3">
          {/* Pending Friend Requests Section */}
          {isLoadingPendingRequests ? (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">Loading pending requests...</p>
            </div>
          ) : pendingRequests && pendingRequests.length > 0 ? (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 px-1">
                Pending Requests ({pendingRequests.length})
              </h3>
              <div className="space-y-3">
                {pendingRequests.map((request: any) => (
                  <PendingRequestCard
                    key={request.id}
                    id={request.id}
                    name={request.name}
                    email={request.email}
                    onAccept={handleAcceptRequest}
                    isLoading={acceptFriendRequestMutation.isPending}
                  />
                ))}
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 px-1">
                  All Users
                </h3>
              </div>
            </div>
          ) : null}

          {filteredUsers.length > 0 ? (
            filteredUsers.map((user: any) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                size="small"
                actionButton={
                  requestSent.has(user.id) ? (
                    <span className="text-sm text-blue-600 font-medium">
                      Request Sent
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAddFriend(user.id)}
                      disabled={sendFriendRequestMutation.isPending}
                      className="p-2 bg-career-darkGreen text-white rounded-lg hover:bg-career-darkGreen/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Add Friend"
                    >
                      <UserPlus className="w-4 h-4" />
                    </button>
                  )
                }
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
