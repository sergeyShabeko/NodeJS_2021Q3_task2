import User from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../common/hashHelper';
import db from '../../models/index';

type UserInstance = User | void;

const userModel = db.sequelize.models.Users;

export const getAllUsersFromDB = async (): Promise<User[]> => await userModel.findAll({ where: { isDeleted: false } });

export const getUserByIdFromDB = async (userId: string): Promise<UserInstance> => {
    const searchedUser = await userModel.findOne({
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
    const hashedPassword = await hashPassword(newUser.password);
    newUser.id = uuidv4();    
    newUser.password = hashedPassword;
    return userModel.create(newUser);
};

export const updateUserInDB = async (userId: string, updatedData: User): Promise<UserInstance> => {
    updatedData.password = await hashPassword(updatedData.password);
    await userModel.update(updatedData, {
        where: {
            id: userId,
            isDeleted: false
        }
    });
    return await getUserByIdFromDB(userId);
};

export const deleteUserFromDB = async (userId: string): Promise<UserInstance> => {
    await userModel.destroy( {
        where: {
          id: userId
          }
        }
    );
};
