import express, { Request, Response, Router } from 'express';
import { addUsersToGroup } from '../services/user-group.service';

const router: Router = express.Router();

router.route('/addUsersToGroup').post(async (req: Request, res: Response) => {
    try {
        const { groupId, userIds } = req.body;
        const data = await addUsersToGroup(groupId, userIds);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send('Something gone wrong!');
    }
});

export default router;
