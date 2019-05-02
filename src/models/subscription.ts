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
					unique: 'subscriptionSubscribable',
				},
				subscribable: {
					allowNull: false,
					type: DataTypes.STRING,
					unique: 'subscriptionSubscribable',
				},
				subscribableId: {
					allowNull: false,
					type: DataTypes.INTEGER,
					unique: 'subscriptionSubscribable',
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
