const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const User = require('../models/User');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      console.log(req.body);
      const [user, token] = await UserService.create(req.body);

      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ user, message: 'Signed in Successfully' });
    } catch (e) {
      next(e);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      console.log(req.body);
      const token = await UserService.signIn(req.body);

      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Signed in successfully!' });
    } catch (e) {
      next(e);
    }
  })
  .get('/', [authenticate, authorize], async (req, res, next) => {
    try {
      console.log('heyyy');
      const users = await User.getAllUsers();
      res.send(users);
    } catch (error) {
      next(error);
    }
  });
