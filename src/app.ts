import express from 'express';
import userRouter from './routers/user.router';
import groupRouter from './routers/group.router';
import userGroupRouter from './routers/user-group.router';

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/userGroup', userGroupRouter);

export default app;
