const Router = require('koa-router');
const { find } = require('../controllers/users');

const router = new Router({ prefix: '/users' });

router.get('/', find);

module.exports = router;
