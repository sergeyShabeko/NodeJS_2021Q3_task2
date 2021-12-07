import express from 'express';
import userRouter from './routers/user.router';
import groupRouter from './routers/group.router';
import userGroupRouter from './routers/user-group.router';
import { requestsLogger, errorsLogger } from './common/logging';
import { errorHandling } from './common/errorHandling';

const app = express();

app.use(express.json());

app.use(requestsLogger);

app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/userGroup', userGroupRouter);

app.use(errorsLogger);
app.use(errorHandling);

export default app;
