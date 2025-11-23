import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createGroup, getGroups, type GroupResponse } from "./functions";
import { useDataStore } from "../../../../Store/DataStore";

export default function useGroup() {
    const queryClient = useQueryClient();
    const { userId } = useDataStore();
    const [groupName, setGroupName] = useState("");
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    // Query to fetch groups
    const { data: groupsData, isLoading: isLoadingGroups, isError: isErrorGroups, refetch: refetchGroups } = useQuery<GroupResponse[]>({
        queryKey: ["groups", userId],
        queryFn: () => getGroups(userId || ""),
        enabled: !!userId,
    });

    const createGroupMutation = useMutation({
        mutationFn: (data: { name: string; adminId: string; members: string[] }) =>
            createGroup(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["groups", userId] });
            setGroupName("");
            setSelectedMembers([]);
        },
        onError: (error: any) => {
            console.error("Error creating group:", error);
        },
    });

    const handleCreateGroup = async () => {
        if (!userId) {
            console.error("User not logged in");
            return;
        }

        if (!groupName.trim()) {
            console.error("Group name is required");
            return;
        }

        await createGroupMutation.mutateAsync({
            name: groupName,
            adminId: userId,
            members: selectedMembers,
        });
    };

    return {
        // Groups query results
        groupsData,
        isLoadingGroups,
        isErrorGroups,
        refetchGroups,
        // Create group mutation
        groupName,
        setGroupName,
        selectedMembers,
        setSelectedMembers,
        handleCreateGroup,
        isLoading: createGroupMutation.isPending,
        isSuccess: createGroupMutation.isSuccess,
        isError: createGroupMutation.isError,
        error: createGroupMutation.error,
    };
}
