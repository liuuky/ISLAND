const Sequelize = require('sequelize')
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define: {
    // create_time  update_time  delete_time
    timestamps:  true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updatedAt',
    deleteAt: 'deleteAt',
    underscored: true,
    freezeTableName: true
  }
})

// 数据库是否每次运行都清除
sequelize.sync({
  force: false
})

module.exports = {
  sequelize
}
