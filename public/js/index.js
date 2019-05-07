var stocks = []

$.get('/api/stocks', function (data) {
  for (var i = 0; i < data.length; i++) {
    stocks.push(data[i].name + ' - ' + data[i].symbol)
  }
})

var substringMatcher = function (strs) {
  return function findMatches (q, cb) {
    var matches, substringRegex

    matches = []

    substrRegex = new RegExp(q, 'i')

    $.each(strs, function (i, str) {
      if (substrRegex.test(str)) {
        matches.push(str)
      }
    })

    cb(matches)
  }
}

$('#symbol').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'stocks',
  source: substringMatcher(stocks)
})

var userId = $('#user').data('id')

$('#buy').on('click', function () {
  var symbol = $('#symbol').val().split(' - ')
  var quantity = $('#quantity').val().trim()
  var userId = $('#user').data('id')

  var symbolId

  $.get('/api/stockId/' + symbol[1], function (data) {
    console.log(data)
    symbolId = data[0].id
  })

  API.getPrice(symbol[1]).then(
    function (data) {
      var newStock = {
        symbol: parseInt(symbolId),
        quantity: parseInt(quantity),
        userId: parseInt(userId),
        purchasePrice: data
      }

      console.log(newStock)

      $.ajax('/api/order', {
        type: 'POST',
        data: newStock
      }).then(
        function () {
          location.reload()
        }
      )
    }
  )
})


$('#sell').on('click', function () {
  var userId = $('#user').data('id')
  var symbol = $('#current-price').attr('name');
  var symbolId

  console.log(symbol)

  $.ajax('/api/stockId/' + symbol, {
    type: 'GET'
  }).then(
    function (data) {
      symbolId = data[0].id
      console.log(symbolId)
      $.ajax('/api/orders/' + userId + '/' + symbolId, {
        type: 'DELETE'
      }).then(
        function () {
          location.reload()
        }
      )
    }
  )

})

var API = {
  getPrice: function (symbol) {
    return $.ajax({
      url: 'https://api.iextrading.com/1.0/stock/' + symbol + '/price',
      type: 'GET'
    })
  },
  getNews: function (symbol) {
    return $.ajax({
      url: 'https://api.iextrading.com/1.0/stock/' + symbol + '/news/last/4',
      type: 'GET'
    })
  },
  getLogo: function (symbol) {
    return $.ajax({
      url: 'https://api.iextrading.com/1.0/stock/' + symbol + '/logo',
      type: 'GET'
    })
  },
  getChart: function (symbol) {
    return $.ajax({
      url: 'https://api.iextrading.com/1.0/stock/' + symbol + '/chart',
      type: 'GET'
    })
  },
  getUsersStockId: function (userId) {
    return $.ajax({
      url: '/api/usersStockId/' + userId,
      type: 'GET'
    })
  },
  getUsersStockSymbols: function (usersStocksIds) {
    return $.ajax({
      url: '/api/usersStockSymbols/' + usersStocksIds,
      type: 'GET'
    })
  }
}

function truncate (str, no_words) {
  return str.split(' ').splice(0, no_words).join(' ')
}

getUsersStocks()
function getUsersStocks () {
  var usersStocksIds = []

  API.getUsersStockId(userId).then(
    function (data) {
      for (var i = 0; i < data.length; i++) {
        usersStocksIds.push(data[i].stockID)
      }
      console.log(usersStocksIds)

      API.getUsersStockSymbols(usersStocksIds).then(
        function (data) {
          console.log(data)
          for (var i = 0; i < data.length; i++) {
            $('nav').append(
              "<a href='#' id='" + data[i].symbol + "'>" + data[i].symbol.toUpperCase() + '</a>'
            )
          }

          getPrice(data[0].symbol)
          getNews(data[0].symbol)
          getLogo(data[0].symbol)
          getChart(data[0].symbol)

          $('nav a').on('click', function () {
            getPrice(this.id)
            getNews(this.id)
            getLogo(this.id)
            getChart(this.id)
          })
        }
      )
    }
  )
}

function getPrice (symbol) {
  API.getPrice(symbol).then(
    function (data) {
      $('#current-price').text('$' + data).attr('name', symbol);
    }
  )
}

function getChart (symbol) {
  API.getChart(symbol).then(
    function (data) {
      var dataArray = []

      for (var i = 0; i < data.length; i++) {
        dataArray.push({ x: new Date(data[i].date), y: data[i].open })
      }

      makeChart(dataArray, symbol)
    }
  )
}

function getNews (symbol) {
  API.getNews(symbol).then(
    function (data) {
      $('#news').empty()
      for (var i = 0; i < data.length; i++) {
        $('#news').append(
          '<a href=' + data[i].url + " target='_blank'>" + data[i].headline + '</a>' +
          '<p>' + truncate(data[i].summary, 30) + '...</p>'
        )
      }
    }
  )
}

function getLogo (symbol) {
  API.getLogo(symbol).then(
    function (data) {
      $('#logo').html(
        "<img src='" + data.url + "'>"
      )
    }
  )
}

function makeChart (dataArray, symbol) {
  var chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: symbol.toUpperCase() + ' - 1 Month',
      fontFamily: 'Source Sans Pro',
      fontSize: 16
    },
    axisX: {
      valueFormatString: 'DD MMM',
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY: {
      title: 'Closing Price (in USD)',
      includeZero: false,
      valueFormatString: '$##0.00',
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
        labelFormatter: function (e) {
          return '$' + CanvasJS.formatNumber(e.value, '##0.00')
        }
      }
    },
    data: [{
      type: 'area',
      color: '#C0D6DF',
      xValueFormatString: 'DD MMM',
      yValueFormatString: '$##0.00',
      dataPoints: dataArray
    }]
  })
  chart.render()
}
