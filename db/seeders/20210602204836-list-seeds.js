'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      'Lists',
      [
        {
          name: 'Groceries',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Laundry',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Homework',
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cleaning',
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Books To Buy',
          userId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Lists', null, {});
  },
};
