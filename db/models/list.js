'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: DataTypes.STRING,
    totalCompletionTime: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    completionStatus: DataTypes.NUMERIC
  }, {});
  List.associate = function (models) {
    List.hasMany(models.Task, { foreignKey: 'listId' })
  };
  return List;
};