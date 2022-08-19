const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Review = require('../models/Review');

module.exports = Router().delete(
  '/:id',
  [authenticate],
  async (req, res, next) => {
    try {
      const review = await Review.getReviewById(req.params.id);
      console.log(review);

      if (
        req.user.email !== 'admin@example.com' &&
        review.user_id !== req.user.id
      )
        throw new Error('Error!!');

      const deleteReview = await Review.delete(review.id);
      res.json(deleteReview);
    } catch (e) {
      next(e);
    }
  }
);
