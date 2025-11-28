import axiosInstance from "../../../libs/axiosInstance";

export const getReceivable = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/groups/receivable/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching receivable:", error);
    throw error;
  }
};
