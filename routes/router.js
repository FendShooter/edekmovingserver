const express = require('express');
const router = express.Router();
const {
  getQuote,
  postReview,
  getReviews,
  postQuote,
} = require('../controller/controller');

router.post('/review', postReview);
router.get('/review', getReviews);

router.get('/edekmoving', getQuote);
router.post('/edekmoving', postQuote);

module.exports = router;
