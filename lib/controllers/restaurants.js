const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Restaurant.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Restaurant.getById(req.params.id);
      await data.getReviews();

      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/:id/reviews', authenticate, async (req, res, next) => {
    try {
      const newReview = await Review.insert({
        ...req.body,
        restaurant_id: req.params.id,
        user_id: req.user.id,
      });
      res.json(newReview);
    } catch (e) {
      next(e);
    }
  });
