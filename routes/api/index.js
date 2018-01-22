import express from 'express';
import spicesRouter from './spices';
import categoriesRouter from './categories';
import apiErrorHandler from '../../middlewares/errorHandler';

const apiRouter = express.Router();

apiRouter.use('/spices', spicesRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use(apiErrorHandler);

export default apiRouter;
