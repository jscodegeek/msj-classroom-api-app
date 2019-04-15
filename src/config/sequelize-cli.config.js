const development = require('./development');
const production = require('./production');

module.exports = {
  development: development.db,
  production: production.db,
};
