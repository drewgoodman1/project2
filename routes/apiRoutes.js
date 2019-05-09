var db = require('../models')

module.exports = function (app) {
  app.get('/api/stocks', function (req, res) {
    db.stock.findAll({ attributes: ['symbol', 'name', 'id'] }).then(function (data) {
      res.json(data)
    })
  })

  app.get('/api/stockId/:symbol', function (req, res) {
    db.stock.findAll({
      where: { symbol: req.params.symbol }
    }).then(function (data) {
      res.json(data)
    })
  })

  app.put('/api/addMoney/:userId/:amount', function (req, res) {
    db.user.update({
      money: req.params.amount
    },{
      where: { id: req.params.userId }
    }).then(function (data) {
      res.json(data)
    })
  })

  app.put('/api/subtractMoney/:userId/:amount', function (req, res) {
    db.user.update({
      money: req.params.amount
    },{
      where: { id: req.params.userId }
    }).then(function (data) {
      res.json(data)
    })
  })

  app.get('/api/usersStockId/:userId', function (req, res) {
    db.stockOrder.findAll({
      where: { userId: req.params.userId }
    }).then(function (data) {
      res.json(data)
    })
  })

  app.get('/api/usersStockSymbols/:usersStocksIds', function (req, res) {
    console.log(req.params.usersStocksIds)
    var array = req.params.usersStocksIds.split(',')
    console.log(array)
    db.stock.findAll({
      where: { id: array }
    }).then(function (data) {
      res.json(data)
    })
  })

  app.post('/api/order', function (req, res) {
    db.stockOrder.create({
      userId: req.body.userId,
      purchasePrice: req.body.purchasePrice,
      quantity: req.body.quantity,
      stockID: req.body.symbol
    }).then(function (data) {
      res.json(data)
    })
  })

  app.get('/api/orders/:userId/:stockId', function (req, res) {
    db.stockOrder.findAll({
      where: {
        userId: req.params.userId,
        stockID: req.params.stockId
      }
    }).then(function (data) {
      res.json(data)
    })
  })

  app.delete('/api/orders/:userId/:stockId', function (req, res) {
    console.log(req.params.stockId)
    db.stockOrder.destroy({
      where: {
        userId: req.params.userId,
        stockID: req.params.stockId
      }
    }).then(function (data) {
      res.json(data)
    })

  })
}
