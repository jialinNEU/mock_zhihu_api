const path = require('path');
const User = require('../models/users');

class UsersController {
  async find(ctx) {
    ctx.body = await User.find();
  }
}

module.exports = new UsersController();
