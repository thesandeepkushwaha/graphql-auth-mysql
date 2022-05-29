const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const tableName = 'contacts';

const Contact = sequelize.define('Contact', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.BIGINT,
  },
  message: {
    type: Sequelize.STRING,
  },
}, { tableName });

module.exports = { Contact };
