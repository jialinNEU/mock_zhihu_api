const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');

class UsersController {
  async find(ctx) {
    ctx.body = await User.find();
  }

  async findById(ctx) {
    const { fields = '' } = ctx.query;
  }

  async create(ctx) {
    Params({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });
    const { name } = ctx.request.body;
    const repeatedUser = await User.findOne({ name }); // 基于用户名校验
    if (repeatedUser) {
      ctx.throw(409, '用户已经存在'); // 已经存在，冲突
    }
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
    });
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.params.body);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.body = user;
  }

  async del(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.status = 204;
  }

  // 使用 jsonwebtoken 进行 jwt 认证
  async login(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });
    const user = await User.findOne(ctx.request.body);
    if (!user) {
      ctx.throw(401, '用户名或密码不正确');
    }
    const { _id, name } = user;
    // jwt数字签名
    const token = jsonwebtoken.sign({ _id, name }, process.env.JWT_SECRET, { expiresIn: '1d' });
    ctx.body = { token };
  }

  // 自定义用户鉴权
  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '没有权限');
    }
    await next();
  }
}

module.exports = new UsersController();
