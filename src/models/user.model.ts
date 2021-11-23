export default class User {
    id?: string;
    login!: string;
    password!: string;
    age!: number;
    isDeleted?: boolean;

    static toResponse(user: User) {
        const { id, login, age } = user;
        return { id, login, age };
      }
}
    