const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const dotenv = require("dotenv")

const routing = require('./routes');

dotenv.config();

mongoose.connect(
  process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, () => console.log('MongoDB 连接成功')
);
mongoose.connection.on('error', console.error); // 监听错误

const app = new Koa();

app.use(error({
  // 定制返回格式
  postFormat: (err, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest },
}));

app.use(koaBody({
  multipart: true, // 支持文件
  formidable: { // multipart parser
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true, // 保留文件后缀名
    multiples: false,
  },
}));

app.use(parameter(app)); // 传入 app 参数，从而在 ctx 中加入 verifyParams 方法进行校验
routing(app);

app.listen(3000, () => console.log('Server is running at port 3000'));
