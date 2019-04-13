module.exports = (sequelize, DataTypes) => {
	const Lecture = sequelize.define('lecture', {
		title: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		description: {
			allowNull: false,
			type: DataTypes.TEXT
		},
		scheduledTime: {
			allowNull: false,
			type: DataTypes.DATE
		},
		deletedAt: DataTypes.DATE
	}, {});

	Lecture.associate = models => {
		Lecture.hasMany(models.Broadcast, { onDelete: 'CASCADE' });
	};

	return Lecture;
};