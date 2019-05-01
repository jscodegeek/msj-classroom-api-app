import * as Sequelize from 'sequelize';

export interface ISubscription extends Subscription {
	id: number;
	userId: number;
	subscribable: string;
	subscribableId: number;
}

export class Subscription extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		super.init(
			{
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
