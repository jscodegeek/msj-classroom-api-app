import * as Sequelize from 'sequelize';

export default class Message extends Sequelize.Model {
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
				timestamps: true,
				freezeTableName: true,
				tableName: 'messages',
				modelName: 'message',
			},
		);

		return Message;
	}

	static associate(models) {
		Message.belongsTo(models.Broadcast);
	}
}
