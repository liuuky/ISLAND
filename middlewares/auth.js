const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor (level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      if (!userToken || !userToken.name) {
        throw new global.errs.Forbidden(errMsg)
      }
      try {
        var decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        // 明确的提示用户 token不合法、token过期
        if (error.name == 'TokenExpiredError') {
          this.errMsg = 'token已过期'
        }
        throw new global.errs.Forbidden(errMsg)
      }

      if (decode.scope < this.level) {
        errMsg = '权限不足'
        throw new global.errs.Forbidden(errMsg)
      }

      // uid, scope
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      await next()
      // Koa是在Nodejs基础上开发的
      // ctx.req 获取的是 nodejs 原生的 request
      // ctx.request 获取的是 Koa 对 nodejs 封装的 request
      // token 检测
      // token 开发者 传递令牌
      // token可放在 body、header中传递验证 前后端进行约定
      // HTTP 规定 身份验证机制 HttpBasicAuth
    }
  }
}

module.exports = {
  Auth
} 
