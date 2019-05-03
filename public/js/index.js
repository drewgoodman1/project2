// Get references to page elements
// var $exampleText = $('#example-text')
// var $exampleDescription = $('#example-description')
// var $submitBtn = $('#submit')
// var $exampleList = $('#example-list')

var symbols = ['aapl', 'wmt', 'snap', 'fb', 'goog']

for (var i = 0; i < symbols.length; i++) {
  $('nav').append(
    "<a href='#' id='" + symbols[i] + "'><i class='fas fa-chart-line'></i>" + symbols[i].toUpperCase() + '</a>'
  )
}

$('nav a').on('click', function () {
  getPrice(this.id)
  getNews(this.id)
  getLogo(this.id)
  getChart(this.id)
})

// The API object contains methods for each kind of request we'll make
var API = {
  // saveExample: function (example) {
  //   return $.ajax({
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     type: 'POST',
  //     url: 'api/examples',
  //     data: JSON.stringify(example)
  //   })
  // },
  // getExamples: function () {
  //   return $.ajax({
  //     url: 'api/examples',
  //     type: 'GET'
  //   })
  // },
  // deleteExample: function (id) {
  //   return $.ajax({
  //     url: 'api/examples/' + id,
  //     type: 'DELETE'
  //   })
  // },
  getPrice: function (symbol) {
    return $.ajax({
      url: 'https://api.iextrading.com/1.0/stock/' + symbol + '/price',
      type: 'GET'
    })
  },
  getNews: function (symbol) {
    return $.ajax({
      url: 'https://api.iextrading.com/1.0/stock/' + symbol + '/news/last/5',
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
  }
}

function truncate (str, no_words) {
  return str.split(' ').splice(0, no_words).join(' ')
}

function getPrice (symbol) {
  API.getPrice(symbol).then(
    function (data) {
      $('#current-price').text('$' + data)
    }
  )
}

function getChart (symbol) {
  API.getChart(symbol).then(
    function (data) {
      console.log(data)
      var dataArray = []

      for (var i = 0; i < data.length; i++) {
        dataArray.push({ x: new Date(data[i].date), y: data[i].open })
      }

      makeChart(dataArray, symbol)
      console.log(dataArray)
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

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function () {
//   API.getExamples().then(function (data) {
//     var $examples = data.map(function (example) {
//       var $a = $('<a>')
//         .text(example.text)
//         .attr('href', '/example/' + example.id)

//       var $li = $('<li>')
//         .attr({
//           class: 'list-group-item',
//           'data-id': example.id
//         })
//         .append($a)

//       var $button = $('<button>')
//         .addClass('btn btn-danger float-right delete')
//         .text('ｘ')

//       $li.append($button)

//       return $li
//     })

//     $exampleList.empty()
//     $exampleList.append($examples)
//   })
// }

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
// var handleFormSubmit = function (event) {
//   event.preventDefault()

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   }

//   if (!(example.text && example.description)) {
//     alert('You must enter an example text and description!')
//     return
//   }

//   API.saveExample(example).then(function () {
//     refreshExamples()
//   })

//   $exampleText.val('')
//   $exampleDescription.val('')
// }

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function () {
//   var idToDelete = $(this)
//     .parent()
//     .attr('data-id')

//   API.deleteExample(idToDelete).then(function () {
//     refreshExamples()
//   })
// }

// Add event listeners to the submit and delete buttons
// $submitBtn.on('click', handleFormSubmit)
// $exampleList.on('click', '.delete', handleDeleteBtnClick)

getPrice(symbols[0])
getNews(symbols[0])
getLogo(symbols[0])
getChart(symbols[0])

// var data = getChart(symbols[0])
// console.log(data)

// var dataArray = []

// for(var i = 0; i < data.length; i++){
//    dataArray.push({ x: new Date(2016, 07, 01), y: 76.727997 })
// }

function makeChart (dataArray, symbol) {
  var chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: symbol.toUpperCase() + ' - 1 Month',
      fontFamily: "Lato",
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
