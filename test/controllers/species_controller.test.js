/* eslint-disable no-undef */
import assert from 'assert';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../app';

const Spice = mongoose.model('spice');
const User = mongoose.model('user');

describe('Spice Controller', () => {
  let token;
  beforeEach('', (done) => {
    const testUser = new User({
      email: 'root_admin@specify.com',
      password: 'AdminPassword',
    });

    testUser.save().then(() => {
      request(app)
        .post('/auth/signin')
        .send({ email: 'root_admin@specify.com', password: 'AdminPassword' })
        .then((response) => {
          // eslint-disable-next-line prefer-destructuring
          token = response.body.token;
          done();
        });
    });
  });

  it('Create Spice', (done) => {
    Spice.count()
      .then((count) => {
        request(app)
          .post('/api/spices/new')
          .set('authorization', token)
          .send({ name: 'Pepper', description: 'Cool Pepper' })
          .end(() => {
            Spice.count().then((newCount) => {
              assert(count + 1 === newCount);
              done();
            });
          });
      });
  });

  it('Edit Spice', (done) => {
    const testSpice = new Spice({ name: 'Black Pepper', description: 'Just test, relax' });

    testSpice.save().then(() => {
      request(app)
        .post(`/api/spices/edit/${testSpice._id}`)
        .set('authorization', token)
        .send({ description: 'Changed!' })
        .end(() => {
          Spice.findOne({ name: 'Black Pepper' })
            .then((spice) => {
              assert(spice.description === 'Changed!');
              done();
            });
        });
    });
  });

  it('Delete Spice', (done) => {
    const testSpice = new Spice({ name: 'Salt', description: 'Salt is so salt' });

    testSpice.save().then(() => {
      request(app)
        .post(`/api/spices/delete/${testSpice._id}`)
        .set('authorization', token)
        .end(() => {
          Spice.findOne({ name: 'Salt' })
            .then((spice) => {
              assert(spice === null);
              done();
            });
        });
    });
  });

  it('Get Spice', (done) => {
    const testSpice = new Spice({ name: 'Chili', description: 'Is so hot!' });

    testSpice.save().then(() => {
      request(app)
        .get(`/api/spices/${testSpice._id}`)
        .then((response) => {
          assert(response.body.description === 'Is so hot!');
          done();
        });
    });
  });

  it('Should get an error if some fields is not exist', (done) => {
    request(app)
      .post('/api/spices/new')
      .set('authorization', token)
      .send({ name: 'Spice without description' })
      .then((response) => {
        assert(response.status === 500);
        done();
      });
  });
});
