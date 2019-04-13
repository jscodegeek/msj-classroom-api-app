module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('lectures', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING
			},
			description: {
				allowNull: false,
				type: Sequelize.TEXT
			},
			scheduledTime: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedAt: Sequelize.DATE,
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('lectures');
	}
};