import express, { Request, Response, Router } from 'express';
import User from './user.model';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './user.repository';
import { getAutoSuggestUsers } from './user.service';

const router: Router = express.Router();

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
    const newUser: User = new User(req.body);
    await createUser(newUser);
    res.status(201).send(newUser);
});

router.route('/:id').put(async (req: Request, res: Response) => {
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
