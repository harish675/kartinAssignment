const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  exerciseTime: {
    type: String,
    default: '8:00 AM', 
  },
  breakfastTime: {
    type: String,
    default: '7:00 AM', 
  },
  lunchTime: {
    type: String,
    default: '12:00 PM', 
  },
  dinnerTime: {
    type: String,
    default: '6:00 PM', 
  },
  meditationTime: {
    type: String,
    default: '7:30 PM',
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
