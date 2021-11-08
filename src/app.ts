import express from 'express';
import userRouter from './routers/user.router';

const app = express();

app.use(express.json());

app.use('/users', userRouter);

export default app;
