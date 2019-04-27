import * as Sequelize from 'sequelize';

export default class Lecture extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		super.init(
			{
				title: {
					allowNull: false,
					unique: true,
					type: DataTypes.STRING,
				},
				description: {
					allowNull: false,
					type: DataTypes.TEXT,
				},
				scheduledTime: {
					allowNull: false,
					type: DataTypes.DATE,
				},
				deletedAt: DataTypes.DATE,
			},
			{
				sequelize,
				paranoid: true,
				modelName: 'lecture',
			},
		);

		return Lecture;
	}

	static associate(models) {
		Lecture.belongsTo(models.Course);
		Lecture.hasMany(models.Broadcast, { onDelete: 'CASCADE' });

		Lecture.belongsToMany(models.User, {
			foreignKey: 'subscribableId',
			constraints: false,
			through: {
				model: models.Subscription,
				unique: false,
				scope: {
					subscribable: 'lecture',
				},
			},
		});
	}
}
