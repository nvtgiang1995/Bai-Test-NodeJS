'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.INTEGER
      },
      UserName: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.TEXT
      },
      FullName: {
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.STRING
      },
      DOB: {
        type: Sequelize.DATE
      },
      Email: {
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('Accounts');
  }
};