const { Router } = require('express');
const UserService = require('../services/UserService');
const { User } = require('../models/User');
const authenticate = require('../middleware/authenticate');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      const token = await UserService.signIn(req.body);
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'WELCOME USER, TO YOUR DOOOM!' });
    } catch (e) {
      next(e);
    }
  })

  .get('/protected', [authenticate], (req, res, next) => {
    res.json({ message: 'Nah uh uh!' });
  });
