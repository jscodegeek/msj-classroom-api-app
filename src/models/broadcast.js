module.exports = (sequelize, DataTypes) => {
  const Broadcast = sequelize.define(
    'broadcast',
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
    {}
  );

  Broadcast.associate = models => {
    Broadcast.belongsTo(models.Lecture);
    Broadcast.hasMany(models.Message, { onDelete: 'CASCADE' });
  };

  return Broadcast;
};
