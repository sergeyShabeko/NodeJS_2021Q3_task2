import express, { Request, Response, Router } from 'express';
import User from '../models/user.model';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, getAutoSuggestUsers } from '../services/user.service';
import { schema } from '../validation/validation';

const router: Router = express.Router();

router.route('/getAllUsers').get(async (_req: Request, res: Response) => {
    const users: User[] = await getAllUsers();
    res.json(users.map((user) => User.toResponse(user)));
});

router.route('/getAutoSuggestUsers').get(async (req: Request, res: Response) => {
    const loginSubstring = req.query['loginSubstring']?.toString();
    const limit = req.query['limit']?.toString();
    const users: User[] = await getAutoSuggestUsers(loginSubstring, limit);
    res.json(users.map((user) => User.toResponse(user)));
});

router.route('/getUserById/:id').get(async (req: Request, res: Response) => {
    const userId: string = req.params['id']!;
    const user: User|void = await getUserById(userId);
    if (user) {
        res.status(200).json(User.toResponse(user));
    } else {
        res.sendStatus(404);
    }
});

router.route('/createUser').post(async (req: Request, res: Response) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const newUser = await createUser(req.body);
        res.status(201).send(newUser);
    }
});

router.route('/updateUser/:id').put(async (req: Request, res: Response) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.message);
    }
    const userId: string = req.params['id']!;
    const updatedData: User = req.body;
    const updatedUser = await updateUser(userId, updatedData);
    if (updatedUser) {
        res.status(200).send(User.toResponse(updatedUser));
    } else {
        res.sendStatus(400);
    }
});

router.route('/deleteUser/:id').delete(async (req: Request, res: Response) => {
    const userId: string = req.params['id']!;
    const isDeleted = await deleteUser(userId);
    if (isDeleted) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    } 
});

export default router;
