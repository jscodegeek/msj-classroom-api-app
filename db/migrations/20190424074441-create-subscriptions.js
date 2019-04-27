module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('subscriptions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			subscribable: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			subscribableId: {
				allowNull: false,
				type: Sequelize.INTEGER,
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
