const faker = require('faker');
const _ = require('lodash');

const titles = [
	'Datacloud Asia 2018',
	'Polymers: Design, Function and Application',
	'10th International Congress of Internal Medicine',
	'Artificial intelligence in imaging - threat or opportunity?',
	'Digital Automotive Manufacturing Conference',
	'International Battery Seminar & Exhibit',
	'Day of Science and Careers London',
	'Living in the Internet of Things and Cyber Security'
];

const lectures = _.times(8, (n) => ({
	title: `#${n + 1} ${titles[n]}`,
	description: faker.lorem.paragraph(5),
	scheduledTime: faker.date.between(new Date('May 20, 2020 03:24:00'), new Date('December 30, 2021 03:24:00')),
	deletedAt: null,
	createdAt: new Date(),
	updatedAt: new Date()
}));

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert('lectures', lectures, {}),
	down: (queryInterface, Sequelize) => queryInterface.bulkDelete('lectures', lectures, {})
};