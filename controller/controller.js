const Quote = require('../models/Quote');
const Review = require('../models/Review');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
require('dotenv').config({ path: '../config/config.env' });
const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_KEY,
  })
);

function check(params) {
  return params === 'on' ? 'Yes' : '-';
}

exports.getQuote = async (req, res, next) => {
  try {
    const quote = await Quote.find();
    res.status(200).send({ message: 'ok' });
  } catch (error) {
    next(error);
  }
};
exports.postQuote = async (req, res, next) => {
  const quote = await Quote(req.body);
  const options = {
    to: process.env.RECEIVER_EMAIL,
    from: process.env.SENDER_EMAIL,
    subject: `${quote.contact}'s quote`,
    html: `<div style="width: 100%; padding: 3px;">

    <h1 style="font-weight: bold;margin-bottom: 15px; color: rgb(116, 116, 116); font-size: 20px;">Client current location :</h1>
    <div style="font-size: 17px">Contact: <span style="font-size: 20px; font-weight: bold">${
      quote.contact
    }</span> </div>
    <div  style="font-size: 17px">Address From: <span style="font-weight: bold; font-size: 20px">${
      quote.addressFrom
    }</span> zip code: <span style="font-size: 20px; font-weight: bold">${
      quote.zipCodeFrom
    }</span></div>
    <div style="font-size: 17px">House: <span  style="font-weight: bold; font-size: 20px">${check(
      quote.houseFrom
    )}</span> </div>
    <div style="font-size: 17px">Appartement: <span style="font-weight: bold; font-size: 20px">${check(
      quote.appartementFrom
    )}</span> Elevator <span style="font-weight: bold; font-size: 20px">${check(
      quote.elevatorFromYes
    )}</span> <span style="font-weight: bold; font-size: 20px">${check(
      quote.elevatorFromNo
    )}</span>  Floor: <span style="font-weight: bold; font-size: 20px">${
      quote.fromFloor
    }<sup>th</sup> </span>   </div>
    <div style="font-size: 17px">Date: <span style="font-weight: bold; font-size: 20px">${formatDate(
      quote.calender
    )}</span> </div>

    <hr>
    <h1 style="font-weight: bold;margin-bottom: 15px; color: rgb(116, 116, 116); font-size: 20px;">Destination location :</h1>
    <div style="font-size: 17px">Address From: <span style="font-weight: bold; font-size: 20px">${
      quote.addressTo
    }</span> zip code: <span style="font-weight: bold; font-size: 20px">${
      quote.zipCodeTo
    }</span></div>
    <div style="font-size: 17px">House: <span style="font-weight: bold; font-size: 20px">${check(
      quote.houseTo
    )}</span> </div>
    <div style="font-size: 17px">Appartement: <span style="font-weight: bold; font-size: 20px">${check(
      quote.appartementTo
    )}</span>
          Elevator: <span style="font-weight: bold; font-size: 20px">${check(
            quote.elevatorToYes
          )}</span> <span style="font-weight: bold; font-size: 20px">${check(
      quote.elevatorToNo
    )}
        </span>  Floor: <span style="font-weight: bold; font-size: 20px">${
          quote.toFloor
        }</span>
          </div>
           <div style="font-size: 17px">List of items: <span style="font-size: 20px; font-weight: bold">
           ${listofItems(quote.listItems)}</span> </div>
          `,
  };
  await quote.save();
  transport.sendMail(options).then(() => {
    console.log('Email sent');
  });

  res.status(201).send({ success: true });
};

exports.postReview = async (req, res, next) => {
  try {
    const review = await Review(req.body);
    await review.save();
    res.json({ success: true, review });
  } catch (error) {
    next(error);
  }
};
exports.getReviews = async (req, res, next) => {
  try {
    const review = await Review.find().sort({ date: -1 });

    const stats = await Review.aggregate([
      {
        $match: { rate: { $gte: 0 } },
      },
      {
        $group: {
          _id: '$rate',
          minPrice: { $min: '$rate' },
          sum: { $sum: '$rate' },
          avgRating: { $avg: '$rate' },
        },
      },
    ]);
    res.status(200).json({ success: true, review, stats });
  } catch (error) {
    console.log(error);
  }
};

function listofItems(list) {
  const items = list.split(',');
  const lists = items
    .map((item) => {
      return `<ul><li>${item}</li></ul>`;
    })
    .join(' ');
  return lists;
}

function formatDate(date) {
  let today = new Date(date);
  return today.toUTCString();
}
