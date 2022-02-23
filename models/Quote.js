const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  contact: {
    type: String,
    required: true,
  },
  addressFrom: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  locType: {
    houseType: {
      type: String,
    },
    elevator: {
      type: Boolean,
    },
    floor: {
      type: String,
    },
  },
  list: {
    type: String,
    required: true,
  },
  addressTo: {
    type: String,
    required: true,
  },
  cityB: {
    type: String,
    required: true,
  },
  zipCodeB: {
    type: String,
    required: true,
  },
  locTypeB: {
    elevator: {
      type: String,
    },
    houseType: {
      type: String,
    },
    floor: {
      type: String,
    },
  },
  note: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
