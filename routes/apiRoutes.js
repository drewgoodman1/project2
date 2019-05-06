var db = require('../models')

module.exports = function (app) {
  // Get all examples
  app.get('/api/examples', function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples)
    })
  })

  // Create a new example
  app.post('/api/examples', function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample)
    })
  })

  // Delete an example by id
  app.delete('/api/examples/:id', function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample)
    })
  })

  app.get('/api/stocks', function (req, res) {
    db.stock.findAll({ attributes: ['symbol', 'name'] }).then(function (data) {
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
}
