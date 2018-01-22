/* eslint-disable no-undef */
import mongoose from 'mongoose';
import keys from '../../config';

before((done) => {
  mongoose.connect(keys.mongoTestUri);
  mongoose.connection
    .once('open', () => done())
    .on('err', (err) => {
      console.warn('Warning: ', err);
    });
});

beforeEach((done) => {
  const { categories, spices, users } = mongoose.connection.collections;
  Promise.all([categories.drop(), spices.drop(), users.drop()])
    .then(() => done())
    .catch(() => done());
});
