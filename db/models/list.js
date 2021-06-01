'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: DataTypes.STRING,
    totalCompletionTime: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    completionStatus: DataTypes.NUMERIC
  }, {});
  List.associate = function(models) {
    // associations can be defined here
  };
  return List;
};