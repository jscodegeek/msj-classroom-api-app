import * as Sequelize from 'sequelize';

export default class Subscription extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		super.init(
			{
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				userId: {
					allowNull: false,
					type: DataTypes.INTEGER,
				},
				subscribable: {
					allowNull: false,
					type: DataTypes.STRING,
				},
				subscribableId: {
					allowNull: false,
					type: DataTypes.INTEGER,
				},
			},
			{
				sequelize,
				modelName: 'subscription',
			},
		);

		return Subscription;
	}
}
