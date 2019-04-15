const broadcasts = require('./broadcasts');
const lectures = require('./lectures');
const messages = require('./messages');
const users = require('./users');

const hc = {
  method: 'GET',
  path: '/hc',
  handler: (request, h) => h.response('Я, и моя молодая команда, делаем, что-то важное...'),
};

module.exports = [
  hc,
  ...broadcasts,
  ...lectures,
  ...messages,
  ...users,
];
