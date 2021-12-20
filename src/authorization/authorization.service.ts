import { config } from '../config';
import { getUserForToken } from '../data-access/user.repository'
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { checkPassword } from '../common/hashHelper'


export const getToken = async (login: string, password: string) => {
    const user = await getUserForToken(login);
    if (!user) {
        return null;
    } else {
        const id = user.id;
        const login = user.login;
        const hashedPassword = user.password!;
        const verifyPassword = await checkPassword(password, hashedPassword);
        if (verifyPassword) {
            const secret: string = config.JWT_SECRET_KEY!;
            const token = jwt.sign({ id, login }, secret);
            return token;
        }
        return null;
    }
};

export const checkAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    try {
        if (token) {
            const secret: string = config.JWT_SECRET_KEY!;
            const t = jwt.verify(token, secret);
            console.log(t);
            return next();
        } else {
            res.status(401).send('Unauthorized error');
        }
    } catch {
        res.status(403).send('Forbidden Error');
    }
};