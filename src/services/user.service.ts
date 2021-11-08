import { getAllUsersFromDB, createUserInDB, getUserByIdFromDB, updateUserInDB, deleteUserFromDB } from '../data-access/user.repository';
import User from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

export const getAutoSuggestUsers = async (loginSubstring: string | undefined, limit: string | undefined): Promise<User[]> => {
    const users = await Object.values(await getAllUsersFromDB()).filter((user) => user.isDeleted !== true);
    let suggestedUsers: User[] = [];
    if (loginSubstring && limit) {
        suggestedUsers = users.filter((user) => user.login.includes(loginSubstring.toString()));
        suggestedUsers = suggestedUsers.sort((a, b) => a.login.localeCompare(b.login));
        suggestedUsers = suggestedUsers.slice(0, Number.parseInt(limit.toString(), 10));
    }
    return suggestedUsers;
};

export const createUser = async (newUser: User) => {
    newUser.id = uuidv4();
    try {
        await createUserInDB(newUser);
    } catch (e) {
        console.error(e);
    }
};

export const getAllUsers = async () => {
    const users = Object.values(await getAllUsersFromDB());
    return users.filter((user) => user.isDeleted !== true);
};

export const getUserById = async (userId: string) => {
    try {
        const user = await getUserByIdFromDB(userId);
        return user;
    } catch {
        return;
    }
};

export const updateUser = async (userId: string, updatedData: User) => {
    try {
        await updateUserInDB(userId, updatedData);
        return true;
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
