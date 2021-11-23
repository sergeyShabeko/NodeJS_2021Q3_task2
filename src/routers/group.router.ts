import express, { Request, Response, Router } from 'express';
import { getAllGroups, getGroupById, createGroup, updateGroup, deleteGroup } from '../services/group.service';
import { groupSchema as schema } from '../validation/validation';

const router: Router = express.Router();

router.route('/getAllGroups').get(async (_req: Request, res: Response) => {
    const groups = await getAllGroups();
    res.json(groups);
});

router.route('/getGroupById/:id').get(async (req: Request, res: Response) => {
    const groupId: string = req.params['id']!;
    const group = await getGroupById(groupId);
    if (group) {
        res.status(200).json(group);
    } else {
        res.sendStatus(404);
    }
});

router.route('/createGroup').post(async (req: Request, res: Response) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const newGroup = await createGroup(req.body);
        res.status(201).send(newGroup);
    }
});

router.route('/updateGroup/:id').put(async (req: Request, res: Response) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.message);
    }
    const groupId: string = req.params['id']!;
    const updatedData = req.body;
    const updatedGroup = await updateGroup(groupId, updatedData);
    if (updatedGroup) {
        res.status(200).send(updatedGroup);
    } else {
        res.sendStatus(400);
    }
});

router.route('/deleteGroup/:id').delete(async (req: Request, res: Response) => {
    const groupId: string = req.params['id']!;
    const isDeleted = await deleteGroup(groupId);
    if (isDeleted) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    } 
});

export default router;
