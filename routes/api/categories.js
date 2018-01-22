import express from 'express';

import categoriesControllers from '../../controllers/categories';
import requireAuth from '../../middlewares/requireAuth';

const categoriesRouter = express.Router();

const {
  getAll, getOne, create, edit, remove,
} = categoriesControllers;
categoriesRouter
  .get('/', getAll)
  .get('/:id', getOne)
  .post('/new', requireAuth, create)
  .post('/edit/:id', requireAuth, edit)
  .post('/delete/:id', requireAuth, remove);

export default categoriesRouter;
