import { getAllGroupsFromDB, getGroupByIdFromDB, createGroupInDB, updateGroupInDB, deleteGroupFromDB } from '../data-access/group.repository';
import Group from '../models/group.model';

export const getAllGroups = async () => await getAllGroupsFromDB();

export const createGroup = async (newGroup: Group) => {
    try {
        return await createGroupInDB(newGroup);
    } catch (e) {
        return e;
    }
};

export const getGroupById = async (groupId: string) => {
    try {
        return await getGroupByIdFromDB(groupId);
    } catch (e){
        return e;
    }
};

export const updateGroup = async (groupId: string, updatedData: Group) => {
    try {
       return await updateGroupInDB(groupId, updatedData);
    } catch {
        return false;
    }
};

export const deleteGroup = async (groupId: string) => {
    try {
        await deleteGroupFromDB(groupId);
        return true;
    } catch {
        return false;
    }
};
