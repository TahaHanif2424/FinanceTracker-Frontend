import axiosInstance from "../../../../libs/axiosInstance"

export type CreateGroupRequest = {
    name: string;
    adminId: string;
    members: string[];
}

export type GroupMember = {
    id: string;
    name?: string;
    userName?: string;
    email: string;
}

export type GroupResponse = {
    id: string;
    name: string;
    icon?: string;
    adminId: string;
    members: (string | GroupMember)[];
    totalAmount?: number;
    createdAt?: string;
    updatedAt?: string;
}

export type TransformedGroup = {
    id: string;
    groupName: string;
    groupIcon?: string;
    totalMembers: number;
    memberNames: string[];
    totalAmount?: number;
}

export type MemberBalance = {
    userId: string;
    userName: string;
    userEmail: string;
    debt: number;
    receivable: number;
    pendingBalance: number;
}

export type AddMemberRequest = {
    groupId: string;
    userId: string[];
}

export const createGroup = async (group: CreateGroupRequest) => {
    const response = await axiosInstance.post("/groups/create", group);
    return response.data;
}

export const getGroups = async (userId: string): Promise<GroupResponse[]> => {
    const response = await axiosInstance.get(`/groups/user/${userId}`);
    const data = response.data;
    // If the response is already an array, return it
    if (Array.isArray(data)) {
        return data;
    }

    // If the response is a single object, wrap it in an array
    if (data && typeof data === 'object') {
        return [data];
    }

    // Default to empty array
    return [];
}

export const getGroupDetail = async (groupId: string): Promise<MemberBalance[]> => {
    const response = await axiosInstance.get(`/groups/info/${groupId}`);
    console.log("Fetched group detail data:", response.data);
    return response.data;
}

export const addMembersToGroup = async (request: AddMemberRequest) => {
    const response = await axiosInstance.post(`/groups/addMember`, {
        groupId: request.groupId,
        userId: request.userId
    });
    return response.data;
}

export const updateMemberExpense = async (
    groupId: string,
    userId: string,
    owes: number,
    gets: number
) => {
    const response = await axiosInstance.put(`/groups/update`, {
        groupId,
        userId,
        owes,
        gets
    });
    return response.data;
}