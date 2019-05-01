import * as Sequelize from 'sequelize';

export interface IBroadcast extends Broadcast {
	id: number;
	name: string;
	pincode: number;
	status: string;
}

export class Broadcast extends Sequelize.Model {
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
