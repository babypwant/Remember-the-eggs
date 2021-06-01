'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      due: {
        type: Sequelize.STRING
      },
      completionStatus: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: "false"
      },
      description: {
        type: Sequelize.TEXT
      },
      listId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Lists' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};