const bcrypt = require('bcryptjs')
const Router = require("koa-router")

const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')

const router = new Router({
  prefix: '/v1/user'
})



// 用户注册 新增post 修改put 查询get 删除delete
  // 思维路径
  // 接收参数 LinValidator
  // email password1 password2 nickname
router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const salt = bcrypt.genSaltSync(10)
  // 10可以理解为安全性、数字越大安全性越高
  const pwd = bcrypt.hashSync(v.get('body.password2', salt))
  const user = {
    email: v.get('body.email'),
    password: pwd,
    nickname: v.get('body.nickname')
  }
  const r = await User.create(user)
  
})

module.exports = router
