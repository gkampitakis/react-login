import { Schema, model } from 'mongoose';
import * as validator from 'validator';
import crypto from 'crypto';

const UserSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  email: {
    type: String,
    required: true
  }
});

UserSchema.path('email').validate(function(email) {
  return validator.isEmail(email);
}, 'Provide a correct email');

UserSchema.pre('save', function(next) {
  const user = model('user', UserSchema, 'user')
    .findOne({ email: this.email })
    .exec()
    .then(user => {
      if (user)
        return next({
          message: 'User with this email already exists',
          code: 409
        });

      this.makeSalt((err, salt) => {
        if (err) return next(err);

        this.salt = salt;

        this.encryptPassword(this.password, (err, hashedPassword) => {
          if (err) {
            return next(err);
          }
          this.password = hashedPassword;
          return next();
        });
      });
    })
    .catch(err => {
      return next({
        message: err.message ? err.message : 'Unknown error',
        code: 500
      });
    });
});

UserSchema.methods = {
  makeSalt(callback) {
    return crypto.randomBytes(16, (err, salt) => {
      if (err) return callback(err);
      else return callback(null, salt.toString('hex'));
    });
  },
  encryptPassword(password, callback) {
    if (!password || !this.salt) return callback('Error');

    let defaultIterations = 872791;
    let defaultKeyLength = 64;
    let newSalt = new Buffer(this.salt, 'base64');
    let digest = 'sha512';
    return crypto.pbkdf2(
      password,
      newSalt,
      defaultIterations,
      defaultKeyLength,
      digest,
      (err, key) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, key.toString('base64'));
        }
      }
    );
  },
  authenticate(password, callback) {
    this.encryptPassword(password, (err, pass) => {
      if (err) return callback(err);
      if (this.password === pass) return callback(null, true);
      else return callback(null, false);
    });
  }
};

export default model('user', UserSchema, 'user');
