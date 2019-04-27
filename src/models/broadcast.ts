import * as Sequelize from 'sequelize';

export default class Broadcast extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		super.init(
			{
				name: {
					allowNull: false,
					unique: true,
					type: DataTypes.STRING,
				},
				pincode: {
					allowNull: false,
					unique: true,
					type: DataTypes.INTEGER,
				},
				status: {
					allowNull: false,
					type: DataTypes.STRING,
				},
			},
			{
				sequelize,
				modelName: 'broadcast',
			},
		);

		return Broadcast;
	}

	static associate(models) {
		Broadcast.belongsTo(models.Lecture);
		Broadcast.hasMany(models.Message, { onDelete: 'CASCADE' });
	}
}
