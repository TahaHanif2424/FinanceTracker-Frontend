import axiosInstance from "../../../libs/axiosInstance";

export interface ExpenseChartData {
  day: string;
  expense: number;
}

export const getChartData = async (userId: string): Promise<ExpenseChartData[]> => {
  const response = await axiosInstance.get(`/expense/chart/${userId}`);
  // Transform string expense to number
  return response.data.map((item: { day: string; expense: string }) => ({
    day: item.day,
    expense: parseFloat(item.expense) || 0,
  }));
};

export const getMonthlyExpense = async (userId: string): Promise<number> => {
  const response = await axiosInstance.get(`/expense/monthly/${userId}`);
  return response.data;
};
