const faker = require('faker');
const _ = require('lodash');

const names = [
  'Datacloud Asia 2018 part 1',
  'Polymers: Design, Function and Application part 1',
  '10th International Congress of Internal Medicine part 1',
  'Artificial intelligence in imaging - threat or opportunity? part 1',
  'Digital Automotive Manufacturing Conference part 1',
  'International Battery Seminar & Exhibit part 1',
  'Day of Science and Careers London part 1',
  'Living in the Internet of Things and Cyber Security part 1',
];

const statuses = ['RESCHEDULED', 'ONLINE', 'CANCELED', 'ENDED'];

const broadcasts = _.times(8, n => ({
  name: `#${n + 1} ${names[n]}`,
  pincode: n + 1,
  status: faker.random.arrayElement(statuses),
  createdAt: new Date(),
  updatedAt: new Date(),
  lectureId: faker.random.number({
    min: 1,
    max: 8,
  }),
}));

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('broadcasts', broadcasts, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('broadcasts', broadcasts, {}),
};
