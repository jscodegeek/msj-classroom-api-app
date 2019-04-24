module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('courses', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
			},
			description: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			startDate: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			imageUrl: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			deletedAt: Sequelize.DATE,
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
		return queryInterface.dropTable('courses');
	},
};
