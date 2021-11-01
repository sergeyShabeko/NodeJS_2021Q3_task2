import { db, DBInterface } from '../database/db';
import User from './user.model';

type UserInstance = User | void;

export const getAllUsersFromDB = async (): Promise<DBInterface> => db;

export const getUserByIdFromDB = async (userId: string): Promise<UserInstance> => {
    const isUserExists = !!db[userId] && !db[userId]!.isDeleted;
    if (isUserExists) {
        return db[userId];
    }
    throw new Error();
};

export const createUserInDB = async (newUser: User): Promise<UserInstance>  => {
    const isUserExists = !!db[newUser.id];
    if (isUserExists) {
        throw new Error();
    } else {
        db[newUser.id] = newUser;
    }
};

export const updateUserInDB = async (userId: string, updatedData: User): Promise<UserInstance> => {
    const isUserExists = !!db[userId] && !db[userId]!.isDeleted;
    if (isUserExists) {
        db[userId] = updatedData;
    } else {
        throw new Error();
    }
};

export const deleteUserFromDB = async (userId: string): Promise<UserInstance> => {
    const isUserExists = !!db[userId];
    if (isUserExists) {
        db[userId]!.isDeleted = true;
    } else {
        throw new Error();
    }
};
