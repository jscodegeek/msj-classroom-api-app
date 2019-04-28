module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('messages', 'broadcastId', {
			allowNull: false,
			type: Sequelize.INTEGER,
			references: {
				model: 'broadcasts',
				key: 'id',
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('messages', 'broadcastId');
	},
};
