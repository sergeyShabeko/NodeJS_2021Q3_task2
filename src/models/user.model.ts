import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../database/db';
import { Model, DataTypes } from 'sequelize';

export default class User extends Model {
    id?: string;
    login!: string;
    password!: string;
    age!: number;
    isDeleted?: boolean;
}

User.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'users',
    timestamps: false
});

User.sync({ force: true })
    .then(() => {
        return User.create({
            id: uuidv4(),
            login: 'Tim',
            password: 'd23dew',
            age: 27
        })
    })
    .then(() => {
        return User.create({
            id: uuidv4(),
            login: 'Siarhei',
            password: 'd4rerfe',
            age: 22
        })
    })
    .then(() => {
        return User.create({
            id: uuidv4(),
            login: 'Ivan',
            password: 'v3f3dc',
            age: 66
        })
    })
    .catch((err: Error) => {
        console.error(err);
    });
    