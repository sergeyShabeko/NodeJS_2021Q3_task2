import User from '../resources/user.model';

export const db: DBInterface = {};

export interface DBInterface {[k: string]: User}
