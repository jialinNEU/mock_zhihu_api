const jwt = require('koa-jwt');
const Router = require('koa-router');
const {
  find, findById, create, update, del,
  checkQuestionExist, checkQuestioner,
} = require('../controllers/questions');

const auth = jwt({ secret: process.env.JWT_SECRET });

const router = new Router({ prefix: '/questions' });

router.get('/', find);
router.post('/', auth, create);
router.get('/:id', checkQuestionExist, findById);
router.patch('/:id', auth, checkQuestionExist, checkQuestioner, update);
router.delete('/:id', auth, checkQuestionExist, checkQuestioner, del);

module.exports = router;
