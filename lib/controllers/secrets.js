const { Router } = require('express');
// const UserService = require('../services/UserService');
// const { User } = require('../models/User');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const { Secret } = require('../models/Secret');

module.exports = Router().get(
  '/',
  [authenticate, authorize],
  async (req, res, next) => {
    try {
      const users = await Secret.getAll();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }
);
