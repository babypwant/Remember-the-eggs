'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Lists', [{
      name: 'Grocery List',
      totalCompletionTime: 20,
      description: 'Get eggs, milk and cheese. Im lactose btw',
      userId: 1,
      completionStatus: 20.0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Lists', null, {});
  }
};
