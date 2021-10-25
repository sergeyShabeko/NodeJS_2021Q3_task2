import { db } from '../database/db';
import User from './user.model';

export const getAllUsers = async (): Promise<User[]> => db;

export const getUserById = async (userId: string): Promise<User|undefined> => db.filter((user) => user.id === userId)[0];

export const createUser = async (newUser: User): Promise<number>  => db.push(newUser);

export const updateUser = async (userId: string, updatedData: User): Promise<User|undefined> => {
    const index: number = db.findIndex((user) => user.id === userId);
    const updatedKeys: string[] = Object.keys(updatedData);
    const searchedUser: User|undefined = db[index];
    if (searchedUser) {
        updatedKeys.forEach((key) => {
            searchedUser[key] = updatedData[key];
        });
    }
    return db[index];
};

export const deleteUser = async (userId: string): Promise<User | undefined> => {
    const index: number = db.findIndex((user) => user.id === userId);
    if (index !== -1) {
    db[index]!.isDeleted = true;
    return db[index];
    }
    return undefined;
};
