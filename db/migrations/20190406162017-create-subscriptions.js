module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('subscriptions', {
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				unique: 'subscriptionSubscribable',
			},
			subscribable: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: 'subscriptionSubscribable',
			},
			subscribableId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				unique: 'subscriptionSubscribable',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('subscriptions');
	},
};
