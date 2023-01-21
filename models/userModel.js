const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields required');
  }
  if (!validator.isEmail(email)) {
    throw Error('Invalid Email');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect Email');
  }

  if (user.password !== password) {
    throw Error('Incorrect Password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
