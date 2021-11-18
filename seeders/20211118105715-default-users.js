'use strict';

const uuid = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: uuid.v4(),
      login: 'Tim',
      password: await hashPassword('d23dew'),
      age: 27,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid.v4(),
      login: 'Jack',
      password: await hashPassword('passsword32'),
      age: 43,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid.v4(),
      login: 'John',
      password: await hashPassword('345fe4fw'),
      age: 66,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}
