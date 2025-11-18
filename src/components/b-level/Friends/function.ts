import axiosInstance from "../../../libs/axiosInstance";

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/auth/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const getNonFriendUsers = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/friends/${userId}/non-friends`);
    return response.data;
  } catch (error) {
    console.error("Error fetching non-friend users:", error);
    throw error;
  }
};

export const getFriends = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/friends/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw error;
  }
};

export const sendFriendRequest = async (userId: string, friendId: string) => {
  try {
    console.log("Sending friend request from", userId, "to", friendId);
    const response = await axiosInstance.post("/friends/send-request", {
      senderId: userId,
      receiverId: friendId,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
};

export const acceptFriendRequest = async (userId: string, friendId: string) => {
  try {
    const response = await axiosInstance.post("/friends/accept-request", {
      senderId: friendId,
      receiverId: userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error;
  }
};

export const getPendingRequests = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/friends/${userId}/pending`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    throw error;
  }
};

export const rejectFriendRequest = async (userId: string, friendId: string) => {
  try {
    const response = await axiosInstance.post("/friends/reject-request", {
      senderId: friendId,
      receiverId: userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error rejecting friend request:", error);
    throw error;
  }
};
