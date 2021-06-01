'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    due: DataTypes.DATE,
    completionStatus: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    listId: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};