const jwt = require('koa-jwt');
const Router = require('koa-router');
const {
  find, findById, create, update, delete: del,
  checkAnswerExist, checkAnswerer,
} = require('../controllers/answers');

const auth = jwt({ secret: process.env.JWT_SECRET });

const router = new Router({ prefix: '/questions/:questionId/answers' });

router.get('/', find);
router.post('/', auth, create);
router.get('/:id', checkAnswerExist, findById);
router.patch('/:id', auth, checkAnswerExist, checkAnswerer, update);
router.delete('/:id', auth, checkAnswerExist, checkAnswerer, del);

module.exports = router;
