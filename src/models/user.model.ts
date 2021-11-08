import { v4 as uuidv4 } from 'uuid';

export default class User {
    id: string = uuidv4();
    login = '';
    password = '';
    age = 0;
    isDeleted = false;
}
