const path = require('path');

class HomeController {
  index(ctx) {
    ctx.body = '<h1>这是主页</h1>';
  }

  // 单文件上传
  upload(ctx) {
    const file = ctx.request.files['']; // Github Issue TODO
    const basename = path.basename(file.path);
    ctx.body = { url: `${ctx.origin}/uploads/${basename}` };
  }
}

module.exports = new HomeController();
