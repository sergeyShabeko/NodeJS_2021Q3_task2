import User from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

type UserInstance = User | void;

export const getAllUsersFromDB = async (): Promise<User[]> => await User.findAll({ where: { isDeleted: false } });

export const getUserByIdFromDB = async (userId: string): Promise<UserInstance> => {
    const searchedUser = await User.findOne({
        where: {
            id: userId,
            isDeleted: false
            }
    });
    if (searchedUser && userId) {
        return searchedUser;
    }
    throw new Error();
};

export const createUserInDB = async (newUser: User): Promise<UserInstance>  => {
    newUser.id = uuidv4();
    return User.create(newUser);
};

export const updateUserInDB = async (userId: string, updatedData: User): Promise<UserInstance> => {
    await User.update(updatedData, {
        where: {
            id: userId,
            isDeleted: false
        }
    });
    return await getUserByIdFromDB(userId);
};

export const deleteUserFromDB = async (userId: string): Promise<UserInstance> => {
    await User.update({
        isDeleted: true
      }, {
        where: {
          id: userId
          }
        }
    );
};
