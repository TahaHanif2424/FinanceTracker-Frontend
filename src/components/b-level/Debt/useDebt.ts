import { useQuery } from "@tanstack/react-query";
import { getDebt } from "./function";
import { useDataStore } from "../../../Store/DataStore";

export default function useDebt() {
  const { userId } = useDataStore();
  const {
    data: debtData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["debt", userId],
    queryFn: () => getDebt(userId || ""),
    enabled: !!userId,
  });

  return { debtData, isLoading, refetch };
}
