const faker = require('faker');
const _ = require('lodash');

const names = [
  'Datacloud Asia 2018',
  'Polymers: Design, Function and Application',
  '10th International Congress of Internal Medicine',
  'Artificial intelligence in imaging - threat or opportunity?',
  'Digital Automotive Manufacturing Conference',
  'International Battery Seminar & Exhibit',
  'Day of Science and Careers London',
  'Living in the Internet of Things and Cyber Security'
];

const statuses = [
  'RESCHEDULED',
  'ONLINE',
  'CANCELED',
  'ENDED'
];

const broadcasts = _.times(8, (n) => ({
  id: n + 1,
  name: `#${n + 1} ${names[n]}`,
  pincode: n + 1,
  status: faker.random.arrayElement(statuses),
  createdAt: new Date(),
  updatedAt: new Date()
}));

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('broadcasts', broadcasts, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('broadcasts', broadcasts, {})
};