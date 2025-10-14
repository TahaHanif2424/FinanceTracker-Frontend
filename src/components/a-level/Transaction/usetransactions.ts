import { useFormik } from "formik";
import type { Transaction } from "./types";
import { createTransaction, getTransactions } from "./function";
import { combineDateAndTime } from "../../../utils/functions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDataStore } from "../../../Store/DataStore";

type TransactionFormValues = Omit<Transaction, "date"> & {
  date: string;
  time: string;
};

export default function useTransaction() {
  const queryClient = useQueryClient();
  const { userId } = useDataStore();

  const formik = useFormik<TransactionFormValues>({
    initialValues: {
      userId: "",
      amount: 0,
      type: "EXPENSE",
      category: "",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().split(" ")[0].slice(0, 5),
      description: "",
    },
    onSubmit: async (values) => {
      if (!userId) return;

      // Remove emoji icon from category (everything before and including the space)
      const cleanCategory = values.category.split(" ").slice(1).join(" ");

      const transactionData: Transaction = {
        userId,
        amount: values.amount,
        type: values.type.toUpperCase() as "INCOME" | "EXPENSE",
        category: cleanCategory,
        date: combineDateAndTime(values.date, values.time),
        description: values.description,
      };
      await createTransaction(transactionData);
      queryClient.invalidateQueries({ queryKey: ["transactions", userId] });
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions", userId],
    queryFn: () => getTransactions(userId || ""),
    enabled: !!userId,
  });

  return { formik, data, isLoading, isError };
}
