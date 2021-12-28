import express from 'express';
import userRouter from './routers/user.router';
import groupRouter from './routers/group.router';
import userGroupRouter from './routers/user-group.router';
import { requestsLogger, errorsLogger } from './common/logging';
import { errorHandling } from './common/errorHandling';
import cors from 'cors';
import authorizationRouter from './authorization/authorization.router';
import { checkAuthorization } from './authorization/authorization.service'

const app = express();

app.use(cors());

app.use(express.json());

app.use(requestsLogger);

app.use(checkAuthorization);

app.use('/login', authorizationRouter);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/userGroup', userGroupRouter);

app.use(errorsLogger);
app.use(errorHandling);

export default app;
