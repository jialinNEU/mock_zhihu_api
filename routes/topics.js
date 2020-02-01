const Router = require('koa-router');
const jwt = require('koa-jwt');
const {
  find, findById, create, update,
  checkTopicExist,
  listFollowers,
} = require('../controllers/topics');

const auth = jwt({ secret: process.env.JWT_SECRET });

const router = new Router({ prefix: '/topics' });

/* CRUD */
router.get('/', find);
router.get('/:id', checkTopicExist, findById);
router.post('/', auth, create);
router.patch('/:id', auth, checkTopicExist, update);

router.get('/:id/followers', checkTopicExist, listFollowers);


module.exports = router;
