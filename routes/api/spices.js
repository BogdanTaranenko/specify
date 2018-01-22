import express from 'express';

import spicesControllers from '../../controllers/spices';
import requireAuth from '../../middlewares/requireAuth';

const spicesRouter = express.Router();

const {
  getAll, getOne, create, edit, remove,
} = spicesControllers;
spicesRouter
  .get('/', getAll)
  .get('/:id', getOne)
  .post('/new', requireAuth, create)
  .post('/edit/:id', requireAuth, edit)
  .post('/delete/:id', requireAuth, remove);

export default spicesRouter;
