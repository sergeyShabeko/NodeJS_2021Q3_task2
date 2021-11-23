'use strict';

const uuid = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [{
      id: uuid.v4(),
      name: 'Users',
      permissions: ['READ', 'SHARE', 'UPLOAD_FILES'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid.v4(),
      name: 'Admins',
      permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
