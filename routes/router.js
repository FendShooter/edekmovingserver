const express = require('express');
const router = express.Router();
const {
  getQuote,
  postReview,
  getReviews,
  postQuote,
} = require('../controller/controller');

router.post('/customerReview', postReview);
router.get('/customerReview', getReviews);

router.get('/edekmoving', getQuote);
router.post('/edekmoving', postQuote);

module.exports = router;
