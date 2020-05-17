const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  static initCore (app) {
    // 入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadHttpException() // 将http-exception放在global全局上，方便其他模块直接使用
    InitManager.loadConfig()
  }

  // 配置开发环境下的错误抛出（throw error）
  static loadConfig (path = '') {
    const configPath= path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  static initLoadRouters() {
    // path config
    const apiDirectory = `${process.cwd()}/app/api`
    // 使用require-directory中间件实现路由自动加载
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })
    
    function whenLoadModule (obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }  

  // 将http-exception放在global全局上，方便其他模块直接使用
  static loadHttpException () {
    const errors = require('./http-exception')
    global.errs = errors
  }

}

module.exports = InitManager
