import { useQuery } from "@tanstack/react-query";
import { getReceivable } from "./function";
import { useDataStore } from "../../../Store/DataStore";

export default function useReceivable() {
  const { userId } = useDataStore();
  const {
    data: receivableData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["receivable", userId],
    queryFn: () => getReceivable(userId || ""),
    enabled: !!userId,
  });

  return { receivableData, isLoading, refetch };
}
