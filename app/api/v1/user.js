const bcrypt = require('bcryptjs')
const Router = require("koa-router")

const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')
const { success } = require('../../lib/helper')

const router = new Router({
  prefix: '/v1/user'
})



// 用户注册 新增post 修改put 查询get 删除delete
  // 思维路径
  // 接收参数 LinValidator
  // email password1 password2 nickname
router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  }
  const r = await User.create(user)
  // 方式一
  throw new global.errs.Success()
  // 方式二
  // success()
  // 方式三
  // ctx.body = {
  //   msg: ''
  // }
})

module.exports = router
