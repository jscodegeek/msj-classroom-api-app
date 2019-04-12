const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config[config.ENVIRONMENT].db);

const models = {
  Broadcast: sequelize.import('./broadcast'),
  Message: sequelize.import('./message')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = models;
