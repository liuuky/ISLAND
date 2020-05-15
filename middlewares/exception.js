// 中间件形式的全局异常处理函数（AOP 面向切面编程）
// 可以监听到整个函数调用链上的任何异常
// 并且将所有错误逻辑集中写在此处，减少代码中的try catch

const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 判断是否是开发环境，并抛出异常
    // 开发环境
    // 生产环境
    // 开发环境  不是HttpException
    const isHttpException = error instanceof HttpException
    const isDev = global.config.env === 'dev'
    if (isDev && !isHttpException) {
      throw error
    }

    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    } else {
      ctx.body = {
        msg: 'we made a mistake.',
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
