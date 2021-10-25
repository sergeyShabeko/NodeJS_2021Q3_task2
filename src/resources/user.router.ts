import express, { Request, Response, Router } from 'express';
import User from './user.model';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './user.repository';
import { getAutoSuggestUsers } from './user.service';
import Joi from 'joi';

const router: Router = express.Router();

const schema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

router.route('/').get(async (_req: Request, res: Response) => {
    const users: User[] = await getAllUsers();
    res.json(users);
});

router.route('/getAutoSuggestUsers').get(async (req: Request, res: Response) => {
    const loginSubstring = req.query['loginSubstring'];
    const limit = req.query['limit'];
    const users: User[] = await getAutoSuggestUsers(loginSubstring, limit);
    res.json(users);
});

router.route('/:id').get(async (req: Request, res: Response) => {
    const userId: string = req.params['id']!;
    const user: User|undefined = await getUserById(userId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.sendStatus(404);
    }
});

router.route('/').post(async (req: Request, res: Response) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.message);
    }
    const newUser: User = new User(req.body);
    await createUser(newUser);
    res.status(201).send(newUser);
});

router.route('/:id').put(async (req: Request, res: Response) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.message);
    }
    const userId: string = req.params['id']!;
    const updatedData: User = req.body;
    const user: User|undefined = await updateUser(userId, updatedData);
    if (user) {
        res.status(200).json(user);
    } else {
        res.sendStatus(400);
    }
});

router.route('/:id').delete(async (req: Request, res: Response) => {
    const userId: string = req.params['id']!;
    const user: User | undefined = await deleteUser(userId);
    if (user) {
        res.status(204).send(user);
    } else {
        res.sendStatus(404);
    }
});

export default router;
