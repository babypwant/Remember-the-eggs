'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      'Tasks',
      [
        {
          name: 'Buy bread',
          description: 'Buying groceries',
          listId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Buy eggs',
          description: 'Buying groceries',
          listId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Buy cheese',
          description: 'Buying groceries',
          listId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Buy milk',
          description: 'Buying groceries',
          listId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Fold Clothes',
          description: 'Stuff for laundry',
          listId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Make bed',
          description: 'Stuff for laundry',
          listId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Study for test',
          description: 'Schoolwork',
          listId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Read chapter 8',
          description: 'Schoolwork',
          listId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Clean bathroom',
          description: 'Cleaning around house',
          listId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Clean kitchen',
          description: 'Cleaning around house',
          listId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Harry Potter',
          description: 'Books I want to buy and read',
          listId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Lord of the Rings',
          description: 'Books I want to buy and read',
          listId: 5,
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
    return queryInterface.bulkDelete('Tasks', null, {});
  },
};
