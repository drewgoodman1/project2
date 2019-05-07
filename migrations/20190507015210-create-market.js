'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('markets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      symbol: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      isEnabled: {
        type: Sequelize.BOOLEAN
      },
      type: {
        type: Sequelize.STRING
      },
      iexId: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('markets');
  }
};