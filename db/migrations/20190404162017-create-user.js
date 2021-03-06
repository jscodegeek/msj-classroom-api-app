module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			firstname: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			lastname: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			login: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			scope: {
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
		return queryInterface.dropTable('users');
	},
};
