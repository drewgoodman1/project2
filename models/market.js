'use strict';
module.exports = (sequelize, DataTypes) => {
  const market = sequelize.define('market', {
    symbol: DataTypes.STRING,
    name: DataTypes.STRING,
    date: DataTypes.STRING,
    isEnabled: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    iexId: DataTypes.INTEGER
  }, {});
  market.associate = function(models) {
    // associations can be defined here
  };
  return market;
};