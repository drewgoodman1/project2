'use strict'
module.exports = function (sequelize, Sequelize) {
  var Stock = sequelize.define('stock', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    symbol: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    isEnabled: {
      type: Sequelize.BOOLEAN
    },
    type: {
      type: Sequelize.STRING
    },
    iexId: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  })

  return Stock
}
