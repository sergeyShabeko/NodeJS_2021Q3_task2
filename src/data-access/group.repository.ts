import Group from '../models/group.model';
import { v4 as uuidv4 } from 'uuid';
import db from '../../models/index';

type GroupInstance = Group | void;

const groupModel = db.sequelize.models.Group;

export const getAllGroupsFromDB = async (): Promise<Group[]> => await groupModel.findAll();

export const getGroupByIdFromDB = async (groupId: string): Promise<GroupInstance> => {
    const searchedGroup = await groupModel.findOne({
        where: {
            id: groupId
        }
    });
    if (searchedGroup && groupId) {
        return searchedGroup;
    }
    throw new Error();
};

export const createGroupInDB = async (newGroup: Group): Promise<GroupInstance> => {
    newGroup.id = uuidv4();
    return groupModel.create(newGroup);
};

export const updateGroupInDB = async (groupId: string, updatedData: Group): Promise<GroupInstance> => {
    await groupModel.update(updatedData, {
        where: {
            id: groupId
        }
    });
    return await getGroupByIdFromDB(groupId);
};

export const deleteGroupFromDB = async (groupId: string): Promise<GroupInstance> => {
    await groupModel.destroy({
        where: {
            id: groupId
        }
    }
    );
};
