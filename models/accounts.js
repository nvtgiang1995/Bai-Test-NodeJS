'use strict';
module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define('Accounts', {
    type: DataTypes.INTEGER,
    UserName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DOB: DataTypes.DATE,
    Email: DataTypes.STRING,
    Phone: DataTypes.TEXT,
  }, {});
  Accounts.associate = function (models) {
    // associations can be defined here
  };
  return Accounts;
};