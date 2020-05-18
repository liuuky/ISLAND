const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const { WXManage} = require('../../services/wx');


const router = new Router({
  prefix: '/v1/token'
})

  // 业务逻辑
  // 1 在API接口编写
  // 2 Model 分层
  // MVC 业务一般写在Model层不是C层

  // 业务分层  Module,Service
  // Thinkphp中分为Model Service Logic
  // Java中的Model DTO

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  // type
  // email 小程序
  // API 权限 公开API
  // token 过期 不合法
  let token
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break;
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManage.codeToToken(v.get('body.account'))
      break;
    case LoginType.ADMIN_EMAIL:
      break;
    default:
      throw new global.errs.ParameterException('没有相应的处理函数');
  }
  ctx.body = {
    token
  }
})

router.post('/verify', async (ctx) => {
  // 验证token
  const v = await new NotEmptyValidator().validate(ctx)
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    result
  }
})


async function emailLogin (account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  // return token = generateToken(user.isNewRecord, 2)
  // 用户scope用8表示 、管理员scope用16表示
  return token = generateToken(user.id, Auth.USER)
}

module.exports = router
