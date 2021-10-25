import { getAllUsers } from './user.repository';
import User from './user.model';
import { ParsedQs } from 'qs';

export const getAutoSuggestUsers = async (loginSubstring: string | ParsedQs | string[] | ParsedQs[] | undefined, limit: string | ParsedQs | string[] | ParsedQs[] | undefined): Promise<User[]> => {
    const users = await getAllUsers();
    let suggestedUsers: User[] = [];
    if (loginSubstring && limit) {
        suggestedUsers = users.filter((user) => user.login.includes(loginSubstring.toString()));
        suggestedUsers = suggestedUsers.sort((a, b) => a.login.localeCompare(b.login));
        suggestedUsers = suggestedUsers.slice(0, Number.parseInt(limit.toString(), 10));
    }
    return suggestedUsers;
};
