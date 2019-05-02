const _ = require('lodash');

const subscriptions = _.times(4, n => ({
	userId: n + 1,
	subscribable: 'course',
	subscribableId: n + 1,
	createdAt: new Date(),
	updatedAt: new Date(),
}));

subscriptions.push(
	..._.times(4, n => ({
		userId: n + 1,
		subscribable: 'course',
		subscribableId: n + 2,
		createdAt: new Date(),
		updatedAt: new Date(),
	})),
);

subscriptions.push(
	..._.times(4, n => ({
		userId: n + 1,
		subscribable: 'lecture',
		subscribableId: n + 1,
		createdAt: new Date(),
		updatedAt: new Date(),
	})),
);

subscriptions.push(
	..._.times(4, n => ({
		userId: n + 1,
		subscribable: 'lecture',
		subscribableId: n + 3,
		createdAt: new Date(),
		updatedAt: new Date(),
	})),
);

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert('subscriptions', subscriptions, {}),
	down: (queryInterface, Sequelize) => queryInterface.bulkDelete('subscriptions', subscriptions, {}),
};
