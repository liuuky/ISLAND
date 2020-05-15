const Router = require('koa-router')
const router = new Router()

const { HttpException, ParameterException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')

router.post('/v1/:id/classic/latest', async (ctx, next) => {

  // 四种传参方式
  // http://localhost:3000/v1/3/classic/latest?parma=nayek
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body

  const v = await new PositiveIntegerValidator().validate(ctx)
  ctx.body = 'success'

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
