import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.genSalt(10, (saltErr, salt) => {
    if (saltErr) { return next(saltErr); }
    bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) { return next(hashErr); }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

const User = mongoose.model('user', UserSchema);

export default User;
