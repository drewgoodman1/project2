'use strict';

var jsonSeedData = require("./symbols.json");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('stocks', jsonSeedData, {});
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
