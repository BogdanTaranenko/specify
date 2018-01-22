/* eslint-disable no-undef */
import assert from 'assert';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../app';

const User = mongoose.model('user');


describe('Auth Controller', () => {
  it('Sign Up return a token', (done) => {
    request(app)
      .post('/auth/signup')
      .send({ email: 'admin@specify.com', password: 'MyPassword' })
      .then((response) => {
        assert(response.body.token !== null);
        done();
      });
  });

  it('Sign In return a token', (done) => {
    const testUser = new User({ email: 'admin@specify.com', password: 'adminpass' });

    testUser.save().then(() => {
      request(app)
        .post('/auth/signin')
        .send({ email: 'admin@specify.com', password: 'adminpass' })
        .then((response) => {
          assert(response.body.token !== undefined);
          done();
        });
    });
  });

  it('Should throw an error if user is not in database', (done) => {
    request(app)
      .post('/auth/signin')
      .send({ email: 'not@in.db', password: 'IAMNotExist' })
      .then((response) => {
        assert(response.body.token === undefined);
        done();
      });
  });
});
