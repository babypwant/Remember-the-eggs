'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'demoUser1',
        fullName: 'Demo User 1',
        email: 'demo@google.com',
        hashedPassword: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'demoUser2',
        fullName: 'Demo User 2',
        email: 'demmy@google.com',
        hashedPassword: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'demoUser3',
        fullName: 'Demo User 3',
        email: 'demmmmm@google.com',
        hashedPassword: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'demoUser4',
        fullName: 'Demo User 4',
        email: 'demmmmmo@google.com',
        hashedPassword: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'demoUser5',
        fullName: 'Demo User 5',
        email: 'demofive@google.com',
        hashedPassword: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
