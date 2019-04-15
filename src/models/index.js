const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config[config.ENVIRONMENT].db);

const models = {
  Broadcast: sequelize.import('./broadcast'),
  Lecture: sequelize.import('./lecture'),
  Message: sequelize.import('./message'),
  User: sequelize.import('./user'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = models;
