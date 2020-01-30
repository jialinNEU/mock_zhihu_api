// 批量注册路由文件
const fs = require('fs');
module.exports = (app) => {
  // 同步读取目录
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') {
      return;
    }
    const route = require(`./${file}`);
    app.use(route.routes()).use(route.allowedMethods());
  });
};