import express from 'express';
import userRouter from './resources/user.router';

const app = express();

app.use(express.json());

app.use('/users', userRouter);

export default app;
