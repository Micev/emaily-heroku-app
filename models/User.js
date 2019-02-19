const mongoose = require('mongoose');
const { Schema } = mongoose;

const userShcema = new Schema({
  googleId: String
});

mongoose.model('users', userShcema);