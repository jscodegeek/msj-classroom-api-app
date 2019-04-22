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
				timestamps: true,
				freezeTableName: true,
				paranoid: true,
				tableName: 'lectures',
				modelName: 'lecture',
			},
		);

		return Lecture;
	}

	static associate(models) {
		Lecture.hasMany(models.Broadcast, { onDelete: 'CASCADE' });
	}
}
