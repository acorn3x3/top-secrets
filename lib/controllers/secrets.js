const { Router } = require('express');
// const UserService = require('../services/UserService');
// const { User } = require('../models/User');
const authenticate = require('../middleware/authenticate');
// const authorize = require('../middleware/authorize');
const { Secret } = require('../models/Secret');
// const { User } = require('../models/User');
// const UserService = require('../services/UserService');

module.exports = Router()
  .get('/', [authenticate], async (req, res, next) => {
    try {
      const users = await Secret.getAll();
      res.json(users);
    } catch (e) {
      next(e);
    }
  })
  .post('/', [authenticate], async (req, res, next) => {
    try {
      const newSecret = await Secret.insert(req.body);
      res.json(newSecret);
    } catch (e) {
      next(e);
    }
  });
