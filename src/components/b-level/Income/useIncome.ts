import { useMutation, useQuery } from "@tanstack/react-query";
import { addIncome, getIncome } from "./function";
import { useDataStore } from "../../../Store/DataStore";

export default function useIncome() {
  const { userId } = useDataStore();
  const {
    data: incomeData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["income"],
    queryFn: () => getIncome(userId || ""),
  });
  const incomeMutation = useMutation({
    mutationFn: ({
      monthlyIncome,
      userId,
    }: {
      monthlyIncome: number;
      userId: string;
    }) => addIncome(userId, monthlyIncome),
    onSuccess: () => {
      refetch();
    },
  });
  return { incomeData, isLoading, refetch, incomeMutation };
}
