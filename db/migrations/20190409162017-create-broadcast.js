module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('broadcasts', {
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
			pincode: {
				allowNull: false,
				unique: true,
				type: Sequelize.INTEGER,
			},
			status: {
				allowNull: false,
				type: Sequelize.STRING,
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
		return queryInterface.dropTable('broadcasts');
	},
};
