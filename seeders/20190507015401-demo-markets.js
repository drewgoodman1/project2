'use strict';

var jsonSeedData = require("./symbols.json");
//var marketData = JSON.parse(jsonSeedData);
//console.log(marketData);


module.exports = {
  
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('markets', jsonSeedData, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
