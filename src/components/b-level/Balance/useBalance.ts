import { useQuery, useMutation } from "@tanstack/react-query";
import { getBalance, addBalance } from "./function";
import { useDataStore } from "../../../Store/DataStore";

export default function useBalance() {
  const { userId } = useDataStore();
  const {
    data: balanceData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance(userId || ""),
  });

  const balanceMutation = useMutation({
    mutationFn: ({ balance, userId }: { balance: number; userId: string }) =>
      addBalance(balance, userId),
    onSuccess: () => {
      refetch();
    },
  });

  return { balanceData, isLoading, refetch, balanceMutation };
}
