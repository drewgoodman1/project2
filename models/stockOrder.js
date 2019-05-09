module.exports = function (sequelize, Sequelize) {
  var StockOrder = sequelize.define('stockOrder', {
    userId: {
      type: Sequelize.INTEGER
    },
    stockID: {
      type: Sequelize.INTEGER
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    purchasePrice: {
      type: Sequelize.FLOAT
    }
  })

  return StockOrder
}
