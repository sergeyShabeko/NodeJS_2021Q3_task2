import User from '../models/user.model';

export const db: DBInterface = {};

export interface DBInterface {[k: string]: User}
