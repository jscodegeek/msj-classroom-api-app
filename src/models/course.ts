import * as Sequelize from 'sequelize';

export default class Course extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		super.init(
			{
				name: {
					allowNull: false,
					unique: true,
					type: DataTypes.STRING,
				},
				description: {
					allowNull: false,
					type: DataTypes.TEXT,
				},
				startDate: {
					allowNull: false,
					type: DataTypes.DATE,
				},
				imageUrl: {
					allowNull: false,
					type: DataTypes.STRING,
				},
				deletedAt: DataTypes.DATE,
			},
			{
				sequelize,
				paranoid: true,
				modelName: 'course',
			},
		);

		return Course;
	}

	static associate(models) {
		Course.hasMany(models.Lecture, { onDelete: 'CASCADE' });

		Course.belongsToMany(models.User, {
			foreignKey: 'subscribableId',
			constraints: false,
			through: {
				model: models.Subscription,
				unique: false,
				scope: {
					subscribable: 'course',
				},
			},
		});
	}
}
