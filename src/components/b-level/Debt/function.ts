import axiosInstance from "../../../libs/axiosInstance";

export const getDebt = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/groups/debt/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching debt:", error);
    throw error;
  }
};
