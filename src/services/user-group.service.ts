import { addUserToGroupToDB } from '../data-access/user-group.repository';
import { getUserByIdFromDB } from '../data-access/user.repository';
import { getGroupByIdFromDB } from '../data-access/group.repository';

export const addUsersToGroup = async (groupId: string, userIds: string[]): Promise<void> => {
    const group = await getGroupByIdFromDB(groupId);
    if(group) {
        userIds.forEach(async (userId) => {
            const user = await getUserByIdFromDB(userId);
            if(user) {
                await addUserToGroupToDB(groupId, userId);
            } else {
                throw new Error();
            }
        });
    } else {
        throw new Error();
    }
};
