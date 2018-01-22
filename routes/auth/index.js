import passport from 'passport';
import express from 'express';
import authControllers from '../../controllers/auth';

const requireSignin = passport.authenticate('local', { session: false });

const authRouter = express.Router();

authRouter
  .post('/signin', requireSignin, authControllers.signin)
  .post('/signup', authControllers.signup);

export default authRouter;
