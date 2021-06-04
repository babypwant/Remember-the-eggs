'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: DataTypes.STRING,
    totalCompletionTime: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    completionStatus: DataTypes.NUMERIC
  }, {});
  List.associate = function (models) {
    List.hasMany(models.Task, { onDelete: 'CASCADE', hooks: true, foreignKey: 'listId' })
    List.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return List;
};