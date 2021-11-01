import express, { Request, Response, Router } from 'express';
import User from './user.model';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, getAutoSuggestUsers } from './user.service';
import Joi from 'joi';

const router: Router = express.Router();

const schema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

router.route('/getAllUsers').get(async (_req: Request, res: Response) => {
    const users: User[] = await getAllUsers();
    res.json(users);
});

router.route('/getAutoSuggestUsers').get(async (req: Request, res: Response) => {
    const loginSubstring = req.query['loginSubstring']?.toString();
    const limit = req.query['limit']?.toString();
    const users: User[] = await getAutoSuggestUsers(loginSubstring, limit);
    res.json(users);
});

router.route('/getUserById/:id').get(async (req: Request, res: Response) => {
    const userId: string = req.params['id']!;
    const user: User|void = await getUserById(userId);
    if (user) {
        res.status(200).json(user);
    }
    res.sendStatus(404);
});

router.route('/createUser').post(async (req: Request, res: Response) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.message);
    }
    const newUser: User = req.body;
    await createUser(newUser);
    res.status(201).send(newUser);
});

router.route('/updateUser/:id').put(async (req: Request, res: Response) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.message);
    }
    const userId: string = req.params['id']!;
    const updatedData: User = req.body;
    const isUpdated = await updateUser(userId, updatedData);
    if (isUpdated) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

router.route('/deleteUser/:id').delete(async (req: Request, res: Response) => {
    const userId: string = req.params['id']!;
    const isDeleted = await deleteUser(userId);
    if (isDeleted) {
        res.sendStatus(204);
    }
    res.sendStatus(404);
});

export default router;
