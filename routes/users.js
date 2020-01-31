const Router = require('koa-router');
const jwt = require('koa-jwt');
const {
  find, findById, create, update, del,
  login, checkOwner,
} = require('../controllers/users');

// 自定义用户认证
// const auth = async (ctx, next) => {
//   const { authorization = '' } = ctx.request.header;
//   const token = authorization.replace('Bearer ', '');
//   try {
//     const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
//     ctx.state.user = user;
//   } catch (err) {
//     ctx.throw(401, err.message); // ctx.state 一般用来存放用户信息
//   }
//   await next();
// };

const auth = jwt({ secret: process.env.JWT_SECRET });

const router = new Router({ prefix: '/users' });

router.get('/', find);

router.get('/:id', findById);

router.post('/', create);

router.patch('/:id', auth, checkOwner, update); // put 是整体替换，patch 是部分替换

router.delete('/:id', auth, checkOwner, del);

router.post('/login', login);

module.exports = router;