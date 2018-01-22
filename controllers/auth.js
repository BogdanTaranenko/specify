import jwt from 'jwt-simple';
import User from '../models/User';
import keys from '../config';

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret);
}

export default {
  signin(req, res) {
    res.send({ token: tokenForUser(req.user) });
  },
  signup(req, res, next) {
    const { email } = req.body;
    const { password } = req.body.password;

    if (!email || !password) {
      return res.status(422).send({ error: 'You must provide email and password' });
    }

    User.findOne({ email }, (err, existingUser) => {
      if (err) { return next(err); }

      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use' });
      }

      const user = new User({
        email,
        password,
      });

      user.save((saveErr) => {
        if (saveErr) { return next(saveErr); }
        res.json({ token: tokenForUser(user) });
      });
    });
  },
};
