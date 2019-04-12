module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('message', {
      author: {
        allowNull: false,
        type: DataTypes.STRING
      },
      text: {
        allowNull: false,
        type: DataTypes.STRING
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING
      }
    }, {});

    Message.associate = models => {
        Message.belongsTo(models.Broadcast);
    };    
  
    return Message;
};