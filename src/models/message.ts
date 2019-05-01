import * as Sequelize from 'sequelize';

export interface IMessage extends Message {
	id: number;
	author: string;
	text: string;
	type: string;
}

export class Message extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		super.init(
			{
				author: {
					allowNull: false,
					type: DataTypes.STRING,
				},
				text: {
					allowNull: false,
					type: DataTypes.TEXT,
				},
				type: {
					allowNull: false,
					type: DataTypes.STRING,
				},
			},
			{
				sequelize,
				modelName: 'message',
			},
		);

		return Message;
	}

	static associate(models) {
		Message.belongsTo(models.Broadcast);
	}
}
