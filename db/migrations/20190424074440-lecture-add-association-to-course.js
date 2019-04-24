module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('lectures', 'courseId', {
			allowNull: false,
			type: Sequelize.INTEGER,
			references: {
				model: 'courses',
				key: 'id',
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('lectures', 'courseId');
	},
};
