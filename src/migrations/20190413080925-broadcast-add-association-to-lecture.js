module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('broadcasts', 'lectureId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'lectures',
        key: 'id',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('broadcasts', 'lectureId');
  },
};
