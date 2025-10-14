export type Transaction = {
  id?: number;
  userId?: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;
  description?: string;
};
