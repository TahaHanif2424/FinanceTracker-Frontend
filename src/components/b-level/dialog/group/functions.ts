import axiosInstance from "../../../../libs/axiosInstance"

type Group = {
    name: string;
    adminId: string;
    members: string[];
}
export const createGroup = async (group: Group) => {
    const response = await axiosInstance.post("/groups/create", group); 
    return response.data;
}