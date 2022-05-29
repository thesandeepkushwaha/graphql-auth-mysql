const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const tableName = 'items';

const Item = sequelize.define('Item', {
  title: {
    type: Sequelize.STRING,
  },
  subTitle: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  }
}, { tableName });

module.exports = { Item };
