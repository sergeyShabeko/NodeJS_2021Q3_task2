import db from '../../models/index';

const userGroupModel = db.sequelize.models.UserGroup;

export const addUserToGroupToDB = async (groupId: string, userId: string): Promise<void> => {
    const transaction = await db.sequelize.transaction();
    try {
        await userGroupModel.create({
            groupId: groupId,
            userId: userId
        }, { transaction: transaction });
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
    }
};
