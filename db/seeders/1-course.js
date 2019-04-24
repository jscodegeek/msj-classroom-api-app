const faker = require('faker');
const _ = require('lodash');

const courses = _.times(4, n => ({
	name: `#${n + 1} COURSE NAME`,
	description: faker.lorem.paragraph(5),
	startDate: faker.date.between(new Date('May 20, 2020 03:24:00'), new Date('December 30, 2021 03:24:00')),
	imageUrl: `https://picsum.photos/id/${(n + 1) * 100}/1600/900`,
	deletedAt: null,
	createdAt: new Date(),
	updatedAt: new Date(),
}));

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert('courses', courses, {}),
	down: (queryInterface, Sequelize) => queryInterface.bulkDelete('courses', courses, {}),
};
