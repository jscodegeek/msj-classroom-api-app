const faker = require('faker');
const _ = require('lodash');

const types = [
  'TYPE 1',
  'TYPE 2',
  'TYPE 3',
  'TYPE 4'
]

const messages = _.times(8, (n) => ({
  id: n + 1,
  author: `${faker.name.firstName} ${faker.name.lastName}`,
  text: faker.lorem.paragraph(5),
  type: faker.random.arrayElement(types),
  createdAt: new Date(),
  updatedAt: new Date(),
  broadcastId: faker.random.number({ min: 1, max: 8 })
}));

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('messages', messages, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('messages', messages, {})
};