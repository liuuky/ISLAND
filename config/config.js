module.exports = {
  // prod
  env: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456'
  },
  security: {
    secretKey: 'abcdefg',
    expiresIn: 60*60*24*30
  },
  wx: {
    appID: 'wxb8c159dc5d60c490',
    appSecret: '7c23f7c366a551ba13115a6dbc0728cf',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}