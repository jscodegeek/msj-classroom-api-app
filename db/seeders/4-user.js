const faker = require('faker');
const _ = require('lodash');
const Bcrypt = require('bcryptjs');

const scopes = ['STUDENT', 'ADMIN'];

const salt = Bcrypt.genSaltSync(10);
const hash = Bcrypt.hashSync('password', salt);

const users = _.times(8, n => ({
	firstname: faker.name.firstName(),
	lastname: faker.name.lastName(),
	login: `login#${n + 1}`,
	password: hash,
	scope: faker.random.arrayElement(scopes),
	createdAt: new Date(),
	updatedAt: new Date(),
}));

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', users, {}),
	down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', users, {}),
};
