'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      name: DataTypes.STRING,
      due: DataTypes.DATE,
      completionStatus: DataTypes.BOOLEAN,
      description: DataTypes.TEXT,
      listId: DataTypes.INTEGER,
    },
    {}
  );
  Task.associate = function (models) {
    Task.belongsTo(models.List, { foreignKey: 'listId' });
  };
  return Task;
};
