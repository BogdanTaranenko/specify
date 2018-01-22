/* eslint-disable no-undef */
import assert from 'assert';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../app';

const Category = mongoose.model('category');
const Spice = mongoose.model('spice');
const User = mongoose.model('user');

describe('Category Controller', () => {
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

  it('Create Category', (done) => {
    const testCategory = new Category({ name: 'China' });

    testCategory.save().then(() => {
      request(app)
        .get(`/api/categories/${testCategory._id}`)
        .then((response) => {
          assert(response.body.name === 'China');
          done();
        });
    });
  });

  it('Edit Category', (done) => {
    const testCategory = new Category({ name: 'India' });
    const testSpice = new Spice({ name: 'Cinnamon', description: 'Cinnamon-cinnamon' });
    testSpice.save().then(() => {
      testCategory.save().then(() => {
        request(app)
          .post(`/api/categories/edit/${testCategory._id}`)
          .set('authorization', token)
          .send({ spices: [testSpice._id] })
          .end(() => {
            Category.findOne({ name: 'India' })
              .then((category) => {
                assert(category.spices[0].toString() === testSpice._id.toString());
                done();
              });
          });
      });
    });
  });

  it('Delete Category', (done) => {
    const testCategory = new Category({ name: 'Spices from the Caribbean Islands' });

    testCategory.save().then(() => {
      request(app)
        .post(`/api/categories/delete/${testCategory._id}`)
        .set('authorization', token)
        .end(() => {
          Category.findOne({ name: 'Spices from Caribbean Islands' })
            .then((category) => {
              assert(category === null);
              done();
            });
        });
    });
  });

  it('Get Category and Spice from this Category', (done) => {
    const testSpice = new Spice({ name: 'Cinnamon', description: 'Cinnamon-cinnamon' });
    testSpice.save().then(() => {
      const testCategory = new Category({ name: 'Spices from East Asia', spices: [testSpice._id] });
      testCategory.save().then(() => {
        request(app)
          .get(`/api/categories/${testCategory._id}`)
          .then((response) => {
            const spiceNameFromThisCategory = response.body.spices[0].name;
            assert(spiceNameFromThisCategory === 'Cinnamon');
            done();
          });
      });
    });
  });
});
