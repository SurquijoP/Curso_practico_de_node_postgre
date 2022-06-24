'use strict';

const { UserSchema, USER_TABLE } = require('../models/user.model');
//producs, orders, categories

module.exports = {
   up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.drop(USER_TABLE);
  }
};
