const faker = require('faker');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const roles = [
	'STUDENT',
	'ADMIN'
];

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('password', salt);

const users = _.times(8, (n) => ({
	firstname: faker.name.firstName(),
	lastname: faker.name.lastName(),
	login: `login #${n + 1}`,
	password: hash,
	role: faker.random.arrayElement(roles),
	createdAt: new Date(),
	updatedAt: new Date()
}));

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', users, {}),
	down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', users, {})
};