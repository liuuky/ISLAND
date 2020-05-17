const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})

const { HttpException, ParameterException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')

router.get('/latest', new Auth().m, async (ctx, next) => {
  // 权限  复杂
  // 限制 token 角色
  // 普通用户  管理员
  // 分级  scope
  // 普通用户用数字8表示 、管理员用数字16表示
  // 给接口设计权限参数，比如设置权限数字 9，当前用户为 8 小于 9 不可访问
  ctx.body = ctx.auth.uid

  // 四种传参方式
  // http://localhost:3000/v1/3/classic/latest?parma=nayek
  // const path = ctx.params
  // const query = ctx.request.query
  // const headers = ctx.request.header
  // const body = ctx.request.body

  // const v = await new PositiveIntegerValidator().validate(ctx)
  // ctx.body = 'success'

  // if (!query) {
  //   const error = new HttpException('为什么错误', 10001, 400)
  //   // const error = new Error('为什么错误')
  //   // error.errorCode = 10001
  //   // error.status = 400
  //   // error.requestUrl = `${ctx.method} ${ctx.path}`
  //   throw error
  // }
  // if (true) {
  //   const error = new ParameterException()
  //   throw error
  // }
  // ctx.body = {
  //   key: 'classic'
  // }
 
  // 异常处理
  // throw new Error('API Exception')
  // 监听错误
  // 输出一段有意义的提示信息
})

module.exports = router
