import { getAllUsersFromDB, createUserInDB, getUserByIdFromDB, updateUserInDB, deleteUserFromDB } from '../data-access/user.repository';
import User from '../models/user.model';

export const getAutoSuggestUsers = async (loginSubstring: string | undefined, limit: string | undefined): Promise<User[]> => {
    const users = await getAllUsersFromDB();
    let suggestedUsers: User[] = [];
    if (loginSubstring && limit) {
        suggestedUsers = users.filter((user) => user.login.includes(loginSubstring.toString()));
        suggestedUsers = suggestedUsers.sort((a, b) => a.login.localeCompare(b.login));
        suggestedUsers = suggestedUsers.slice(0, Number.parseInt(limit.toString(), 10));
    }
    return suggestedUsers;
};

export const createUser = async (newUser: User) => {
    try {
        return await createUserInDB(newUser);
    } catch (e) {
        console.error(e);
    }
};

export const getAllUsers = async () => await getAllUsersFromDB();

export const getUserById = async (userId: string) => {
    try {
        return await getUserByIdFromDB(userId);
    } catch {
        return;
    }
};

export const updateUser = async (userId: string, updatedData: User) => {
    try {
       return await updateUserInDB(userId, updatedData);
    } catch {
        return false;
    }
};

export const deleteUser = async (userId: string) => {
    try {
        await deleteUserFromDB(userId);
        return true;
    } catch {
        return false;
    }
};
