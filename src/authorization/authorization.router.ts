import express, { Router } from 'express';
import { getToken } from './authorization.service';

const router: Router = express.Router();

router.post('/', async (req, res) => {
    const login: string = req.body.login;
    const password: string = req.body.password;
    const token = await getToken(login, password);

    if(!token) {
        res.status(403).send('Forbidden Error');
    } else {
        const result = {
            "token": token
        }
        res.status(200).send(result);
    }
});

export default router; 