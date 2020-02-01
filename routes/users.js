const Router = require('koa-router');
const jwt = require('koa-jwt');
const {
  find, findById, create, update, del,
  login, checkOwner, checkUserExist,
  listFollowing, listFollowers, follow, unfollow,
  listFollowingTopics, followTopic, unfollowTopic,
  listQuestions,
  listLikingAnswers, likeAnswer, unlikeAnswer,
  listDislikingAnswers, dislikeAnswer, undislikeAnswer,
  listCollectingAnswers, collectAnswer, uncollectAnswer,
} = require('../controllers/users');
const { checkTopicExist } = require('../controllers/topics');
const { checkAnswerExist } = require('../controllers/answers');

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

/* CRUD */
router.get('/', find);
router.get('/:id', findById);
router.post('/', create);
router.patch('/:id', auth, checkOwner, update); // put 是整体替换，patch 是部分替换
router.delete('/:id', auth, checkOwner, del);

/* 登录 */
router.post('/login', login);

/* 关注模块相关接口 */
router.get('/:id/following', listFollowing);
router.get('/:id/followers', listFollowers);
router.put('/following/:id', auth, checkUserExist, follow);
router.delete('/following/:id', auth, checkUserExist, unfollow);

/* 话题模块相关接口 */
router.get('/:id/followingTopics', listFollowingTopics);
router.put('/followingTopics/:id', auth, checkTopicExist, followTopic);
router.delete('/followingTopics/:id', auth, checkTopicExist, unfollowTopic);

/* 问题模块相关接口 */
router.get('/:id/questions', listQuestions);

/* 答案模块相关接口 */
router.get('/:id/likingAnswers', listLikingAnswers);
router.put('/likingAnswers/:id', auth, checkAnswerExist, likeAnswer, undislikeAnswer);
router.delete('/likingAnswers/:id', auth, checkAnswerExist, unlikeAnswer);
router.get('/:id/dislikingAnswers', listDislikingAnswers);
router.put('/dislikingAnswers/:id', auth, checkAnswerExist, dislikeAnswer, unlikeAnswer);
router.delete('/dislikingAnswers/:id', auth, checkAnswerExist, undislikeAnswer);
router.get('/:id/collectingAnswers', listCollectingAnswers);
router.put('/collectingAnswers/:id', auth, checkAnswerExist, collectAnswer);
router.delete('/collectingAnswers/:id', auth, checkAnswerExist, uncollectAnswer);

module.exports = router;
