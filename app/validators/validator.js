const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { User } = require('../models/user')

class PositiveIntegerValidator extends LinValidator {
  constructor () {
    super()
    this.id = [
      new Rule('isInt', '需要是正整数', { min: 1})
    ]
  }
}

class RegisterValidator extends LinValidator {
  constructor () {
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规范')
    ]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32
      })
    ]
  }

  validatePassword(val) {
    const pwd1 = val.body.password1
    const pwd2 = val.body.password2
    if (pwd1 !== pwd2) {
      throw new Error('两个密码必须相同')
    }
  }

  async validateEmail (val) {
    const email = val.body.email
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (user) {
      throw new Error('Email已存在')
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator
}
