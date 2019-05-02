module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addConstraint('subscriptions', ['userId', 'subscribableId', 'subscribable'], {
			type: 'primary key',
			name: 'compoundKey',
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.removeConstraint('subscriptions', 'compoundKey');
	},
};
