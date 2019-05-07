var db = require('../models')
var passport = require('passport')

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('signin')
  })

  app.get('*', function (req, res) {
    res.render('404')
  })
}
