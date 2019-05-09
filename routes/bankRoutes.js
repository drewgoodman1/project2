var db = require('../models')

module.exports = function (app) {
  $('#buy').on('click', function () {
    var symbol = $('#symbol').val().split(' - ')
    var quantity = $('#quantity').val().trim()
    var userId = $('#user').data('id')

    var symbolId

    API.getPrice(symbol[1]).then(
      function (data) {
        var newStock = {
          symbol: parseInt(symbolId),
          quantity: parseInt(quantity),
          userId: parseInt(userId),
          purchasePrice: parseFloat(data)
        }

        console.log(newStock)

        $.ajax('/api/order', {
          type: 'POST',
          data: newStock
        }).then(
          function () {

          }
        )
        var total = newStock.purchasePrice * newStock.quantity
        console.log(total)
        app.get('/api/usersStockId/:userId', function (req, res) {
            db.users.find({
                where: {
                    userId: req.params.userId
                }
            }).then(function (data) {
                res.json(data)
                res.body.money
            })

      }
    )

  })
}