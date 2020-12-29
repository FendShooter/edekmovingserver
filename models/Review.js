const mongoose = require('mongoose');

const reviewShema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  rate: Number,
  comment: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewShema);

module.exports = Review;
