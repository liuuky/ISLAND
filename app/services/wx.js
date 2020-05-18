const util = require('util')
const axios = require('axios');

const { User } = require('../models/user')

const { generateToken } = require('../../core/util');

const { Auth } = require('../../middlewares/auth');

class WXManage {
  static async codeToToken(code) {
    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code
    )

    const result = await axios.get(url)
    if (result.status !== 200) {
      throw new global.errs.AuthFailed('openid获取失败')
    }
    const errcode = result.data.errcode
    const errmsg = result.data.errmsg
    // 微信文档里虽然写着正确返回errcode:0,然而并没有返回，正确的话就不返回errcode了
    if (errcode) {
      throw new global.errs.AuthFailed('openid获取失败' + errmsg)
    }
    // openid
    // 档案 user  uid  openid  长
    // openid

    let user = await User.getUserByOpenid(result.data.openid)
    if (!user) {
      user = await User.registerByOpenid(result.data.openid)
    } 
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManage
}
