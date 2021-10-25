import { v4 as uuidv4 } from 'uuid';

export default class User {
 [key: string]: string | number | boolean | undefined;

 id: string;
 login: string;
 password: string;
 age: number;
 isDeleted: boolean;

 constructor({
     id = uuidv4(),
     login = 'user',
     password = 'P@55w0rd',
     age = 30,
     isDeleted = false
 } = {}) {
     this.id = id;
     this.login = login;
     this.password = password;
     this.age = age;
     this.isDeleted = isDeleted;
 }
}
