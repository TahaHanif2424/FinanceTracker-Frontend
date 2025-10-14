import axiosInstance from "../../../libs/axiosInstance";

export const addBalance = async (balance: number, userId: string) => {
  try {
    const response = await axiosInstance.put(`/expense/balance`, {
      balance,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding balance:", error);
    throw error;
  }
};
export const getBalance = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/expense/balance/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};
