const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.STRING, // 发布时间
  fav_nums: Sequelize.STRING, // 点赞数量
  title: Sequelize.STRING,
  type: Sequelize.STRING
}

// Moive类
class Movie extends Model {

}
// 创建movie表
Movie.init(classicFields, {
  sequelize,
  tableName: 'movie'
})

// Sentence类
class Sentence extends Model {

}
// 创建sentence表
Sentence.init(classicFields, {
  sequelize,
  tableName: 'sentence'
})

// Music类
class Music extends Model {

}
// 扩展music类
const musicFields = Object.assign({
  url: Sequelize.STRING
}, classicFields)
// 创建music表
Music.init(musicFields, {
  sequelize,
  tableName: 'music'
})

module.exports = {
  Movie,
  Sentence,
  Music
}
