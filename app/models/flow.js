const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

// Flow 业务表
class Flow extends Model {

}

Flow.init({
  index: Sequelize.INTEGER,  // 期刊序号
  art_id: Sequelize.INTEGER,  // 根据id编号找到相应信息表的数据
  type: Sequelize.INTEGER  // 外键 例如以下
  // type: 100 对应Movie表
  // type: 200 对应Sentence表
  // type: 300 对用Musci表
}, {
  sequelize,
  tableName: 'flow'
})

module.exports = {
  Flow
}
