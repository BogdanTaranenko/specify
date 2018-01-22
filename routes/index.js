import express from 'express';

import apiRouter from './api';
import authRouter from './auth';

const RootRouter = express.Router();

RootRouter.use('/api', apiRouter);
RootRouter.use('/auth', authRouter);

export default RootRouter;
