const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete2', 'root', 'Alo113114115@@', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
