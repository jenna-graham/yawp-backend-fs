const { Router } = require('express');
const Restaurant = require('../models/Restaurant');

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
      console.log(data);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
