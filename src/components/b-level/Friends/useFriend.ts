import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNonFriendUsers,
  getFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getPendingRequests,
  rejectFriendRequest,
} from "./function";
import { useDataStore } from "../../../Store/DataStore";

export default function useFriend() {
  const queryClient = useQueryClient();
  const { userId } = useDataStore();

  // Query to fetch non-friend users (users who are not friends yet)
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useQuery({
    queryKey: ["nonFriendUsers", userId],
    queryFn: () => getNonFriendUsers(userId || ""),
    enabled: !!userId,
  });

  // Query to fetch user's friends
  const {
    data: friendsData,
    isLoading: isLoadingFriends,
    isError: isErrorFriends,
    refetch: refetchFriends,
  } = useQuery({
    queryKey: ["friends", userId],
    queryFn: () => getFriends(userId || ""),
    enabled: !!userId,
  });

  // Query to fetch pending friend requests
  const {
    data: pendingRequestsData,
    isLoading: isLoadingPendingRequests,
    isError: isErrorPendingRequests,
    refetch: refetchPendingRequests,
  } = useQuery({
    queryKey: ["pendingRequests", userId],
    queryFn: () => getPendingRequests(userId || ""),
    enabled: !!userId,
  });

  // Mutation to send friend request
  const sendFriendRequestMutation = useMutation({
    mutationFn: ({ friendId }: { friendId: string }) =>
      sendFriendRequest(userId || "", friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends", userId] });
      queryClient.invalidateQueries({ queryKey: ["nonFriendUsers", userId] });
      queryClient.invalidateQueries({ queryKey: ["pendingRequests", userId] });
    },
    onError: (error: any) => {
      console.error("Error sending friend request:", error);
    },
  });

  // Mutation to accept friend request
  const acceptFriendRequestMutation = useMutation({
    mutationFn: ({ friendId }: { friendId: string }) =>
      acceptFriendRequest(userId || "", friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends", userId] });
      queryClient.invalidateQueries({ queryKey: ["nonFriendUsers", userId] });
      queryClient.invalidateQueries({ queryKey: ["pendingRequests", userId] });
    },
    onError: (error: any) => {
      console.error("Error accepting friend request:", error);
    },
  });

  // Mutation to reject friend request
  const rejectFriendRequestMutation = useMutation({
    mutationFn: ({ friendId }: { friendId: string }) =>
      rejectFriendRequest(userId || "", friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends", userId] });
      queryClient.invalidateQueries({ queryKey: ["nonFriendUsers", userId] });
      queryClient.invalidateQueries({ queryKey: ["pendingRequests", userId] });
    },
    onError: (error: any) => {
      console.error("Error rejecting friend request:", error);
    },
  });

  return {
    usersData,
    isLoadingUsers,
    isErrorUsers,
    friendsData,
    isLoadingFriends,
    isErrorFriends,
    refetchFriends,
    pendingRequestsData,
    isLoadingPendingRequests,
    isErrorPendingRequests,
    refetchPendingRequests,
    sendFriendRequestMutation,
    acceptFriendRequestMutation,
    rejectFriendRequestMutation,
  };
}
