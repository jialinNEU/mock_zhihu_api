const jwt = require('koa-jwt');
const Router = require('koa-router');
const {
  find, findById, create, update, delete: del,
  checkCommentExist, checkCommentator,
} = require('../controllers/comments');

const auth = jwt({ secret: process.env.JWT_SECRET });

const router = new Router({ prefix: '/questions/:questionId/answers/:answerId/comments' });

router.get('/', find);
router.post('/', auth, create);
router.get('/:id', checkCommentExist, findById);
router.patch('/:id', auth, checkCommentExist, checkCommentator, update);
router.delete('/:id', auth, checkCommentExist, checkCommentator, del);

module.exports = router;
