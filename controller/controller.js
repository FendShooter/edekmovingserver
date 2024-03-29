const Quote = require('../models/Quote');
const Review = require('../models/Review');
const sendEmail = require('../nodemailer');

require('dotenv').config({ path: '../config/config.env' });

exports.getQuote = async (req, res, next) => {
  try {
    const quote = await Quote.find();
    res.status(200).send({ message: 'ok' });
  } catch (error) {
    next(error);
  }
};
exports.postQuote = async (req, res, next) => {
  const quote = await new Quote(req.body);
  const {
    city,
    cityB,
    contact,
    date,
    zipCodeB,
    zipCode,
    addressFrom,
    addressTo,
    list,
    note,
    locType,
    locTypeB,
  } = quote;
  const message = `

Contact: ${contact}
--------------------------------------------------
Address from: ${addressFrom} ${city} ${zipCode}
Type: ${locType?.houseType}
Elevator: ${elevatorFormatData(locType?.elevator)}
Floor: ${locType?.floor}
Date : ${date}
Note : ${note}
--------------------------------------------------
Address To: ${addressTo} ${cityB} ${zipCodeB}
Type: ${locTypeB?.houseType}
Elevator: ${elevatorFormatData(locTypeB?.elevator)}
Floor: ${locTypeB?.floor}
----------------------------------------------------------
List: ${list} 
  `;
  await sendEmail({
    to: process.env.MAIL_RECEIVER,
    subject: 'New quote',
    message,
  }).catch((err) => {
    console.log(err);
  });
  await quote.save();
  res.status(201).json({ success: true, message });
};

exports.postReview = async (req, res, next) => {
  // console.log(req.body);
  try {
    const review = await new Review(req.body);
    await review.save();
    res.json({ success: true, review });
  } catch (error) {
    next(error);
  }
};
exports.getReviews = async (req, res, next) => {
  try {
    const review = await Review.find().sort({ date: -1 });
    const total = review && review?.map((rate) => rate.rate);
    const avg = total.reduce((acc, num) => acc + num, 0);

    const initialRating = avg / review?.length;
    const stats = await Review.aggregate([
      {
        $match: { rate: { $gt: 0 } },
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
    res
      .status(200)
      .json({
        success: true,
        review,
        stats,
        initialRating,
        count: review.length,
      });
  } catch (error) {
    console.log(error);
  }
};

function elevatorFormatData(data) {
  if (data === 'true' || data == true) {
    return 'Yes';
  } else if (data === 'false') {
    return 'No';
  } else {
    return 'n/a';
  }
}
function listofItems(list) {
  const items = list.split(',');
  const lists = items
    .map((item) => {
      return `<li>${item}</li>`;
    })
    .join(' ');
  return lists;
}

function formatDate(date) {
  let today = new Date(date);
  return today.toLocaleDateString('En', { month: '2-digit' });
}
