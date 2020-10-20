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
  zipCodeFrom: {
    type: Number,
    required: true,
  },
  houseFrom: {
    type: String,
  },
  appartementFrom: {
    type: String,
  },
  calender: {
    type: Date,
    required: true,
  },
  addressTo: {
    type: String,
    required: true,
  },
  zipCodeTo: {
    type: String,
    required: true,
  },
  houseTo: {
    type: String,
  },
  appartementTo: {
    type: String,
  },
  fromFloor: {
    type: String,
  },
  elevatorToYes: {
    type: String,
  },
  elevatorToNo: {
    type: String,
  },
  elevatorFromNo: {
    type: String,
  },
  elevatorFromYes: {
    type: String,
  },
  toFloor: {
    type: String,
  },
  listItems: {
    type: String,
    required: true,
  },
});
    
  
const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;