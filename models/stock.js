'use strict';
module.exports = (sequelize, DataTypes) => {
  const stock = sequelize.define('stock', {
    symbol: DataTypes.STRING,
    name: DataTypes.STRING,
    date: DataTypes.STRING,
    isEnabled: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    iexId: DataTypes.INTEGER
  }, {});
  stock.associate = function(models) {
    // associations can be defined here
  };
  return stock;
};