import { Check, X, Inbox as InboxIcon } from "lucide-react";
import useFriend from "./useFriend";
import Loader from "../../c-level/Loader";

export default function RequestsTab() {
  const {
    pendingRequestsData,
    isLoadingPendingRequests,
    acceptFriendRequestMutation,
    rejectFriendRequestMutation,
  } = useFriend();
  const pendingRequests = pendingRequestsData || [];

  const handleAcceptRequest = (userId: string) => {
    acceptFriendRequestMutation.mutate(
      { friendId: userId },
      {
        onError: (_error: any) => {
          alert("Failed to accept friend request. Please try again.");
        },
      }
    );
  };

  const handleRejectRequest = (userId: string) => {
    rejectFriendRequestMutation.mutate(
      { friendId: userId },
      {
        onError: (_error: any) => {
          alert("Failed to reject friend request. Please try again.");
        },
      }
    );
  };

  if (isLoadingPendingRequests) {
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
            <h2 className="text-xl font-bold text-gray-800">Friend Requests</h2>
            <p className="text-sm text-gray-500 mt-1">
              {pendingRequests.length} pending{" "}
              {pendingRequests.length === 1 ? "request" : "requests"}
            </p>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="flex-1 overflow-y-auto p-6 min-h-0">
        {pendingRequests.length > 0 ? (
          <div className="space-y-4 max-w-3xl mx-auto">
            {pendingRequests.map((request: any) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {request.name.charAt(0).toUpperCase()}
                  </div>
                  {/* User Info */}
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      {request.name}
                    </h3>
                    <p className="text-sm text-gray-600">{request.email}</p>
                    <span className="inline-block mt-1 text-xs text-blue-700 font-semibold bg-blue-200 px-2 py-0.5 rounded">
                      Friend Request
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleAcceptRequest(request.id)}
                    disabled={
                      acceptFriendRequestMutation.isPending ||
                      rejectFriendRequestMutation.isPending
                    }
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm hover:shadow-md"
                    title="Accept Request"
                  >
                    <Check className="w-4 h-4" />
                    <span className="font-medium">Accept</span>
                  </button>
                  <button
                    onClick={() => handleRejectRequest(request.id)}
                    disabled={
                      acceptFriendRequestMutation.isPending ||
                      rejectFriendRequestMutation.isPending
                    }
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm hover:shadow-md"
                    title="Reject Request"
                  >
                    <X className="w-4 h-4" />
                    <span className="font-medium">Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <InboxIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No pending requests
            </h3>
            <p className="text-gray-500 text-sm max-w-md">
              You don't have any friend requests at the moment. When someone sends you a
              friend request, it will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
