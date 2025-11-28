import { useQuery } from "@tanstack/react-query";
import { getChartData, getMonthlyExpense } from "./function";
import { useDataStore } from "../../../Store/DataStore";

export default function useChartData() {
  const { userId } = useDataStore();

  const {
    data: chartData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["chartData", userId],
    queryFn: () => getChartData(userId || ""),
    enabled: !!userId,
  });

  const {
    data: monthlyExpense,
    isLoading: monthlyExpenseLoading,
    refetch: refetchMonthlyExpense,
  } = useQuery({
    queryKey: ["monthlyExpense", userId],
    queryFn: () => getMonthlyExpense(userId || ""),
    enabled: !!userId,
  });

  return { chartData, isLoading, refetch, monthlyExpense, monthlyExpenseLoading, refetchMonthlyExpense };
}
