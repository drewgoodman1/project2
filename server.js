require('dotenv').config()
var express = require('express')
var exphbs = require('express-handlebars')

var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')

// var IEX = require('investors-exchange.api')

// const AAPL = IEX.stock('aapl')
// console.log('---test---')
// const quote = {}
// quote.default = AAPL.quote()
// quote.percent = AAPL.quote({displayPercent: true}).then(console.log(quote))


var Handlebars = require('handlebars')
var HandlebarsIntl = require('handlebars-intl')

var db = require('./models')

require('./config/passport.js')(passport, db.user)

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

var PORT = process.env.PORT || 3000

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

var env = require('dotenv').load()

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
)
app.set('view engine', 'handlebars')

var authRoute = require('./routes/authRoutes')(app, passport)

HandlebarsIntl.registerWith(Handlebars)

// Routes
require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)
require('./routes/authRoutes')(app, passport)

var syncOptions = { force: false }

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    )
  })
})

module.exports = app
