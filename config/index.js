const development = require('./development');
const production = require('./production');

const ENVIRONMENT = process.env.NODE_ENV || 'development';

module.exports = {
    development,
    production,
    ENVIRONMENT,
}