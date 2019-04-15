const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { tryCatchHelper } = require('../helpers/formatting');
const config = require('../config');
const tempData = require('../services/temp');

const { JWT_SECRET_KEY } = config[config.ENVIRONMENT];

const hashPassword = async (user, options) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      login: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    }
  );

  User.decodeToken = token => {
    let decoded;

    try {
      decoded = jwt.verify(token, JWT_SECRET_KEY);
    } catch (err) {
      return ['token is invalid'];
    }

    return [null, decoded];
  };

  User.findByToken = async token => {
    const [err, decoded] = User.decodeToken(token);
    if (err) return [err];

    return [null, decoded];
  };

  User.findByCredentials = async ({ email, password }) => {
    const userObj = await User.findOne({ where: { email } });
    if (userObj === null) return ['wrong email'];

    const user = userObj.dataValues;

    const [err, match] = await tryCatchHelper(bcrypt.compare(password, user.password));
    if (!match) return ['wrong password'];

    return [null, user];
  };

  User.generateJwtToken = async userObj => {
    const user = _.cloneDeep(userObj);
    delete user.password;

    const token = jwt.sign(user, JWT_SECRET_KEY);
    tempData.tokens.push(token);

    return token;
  };

  User.createUser = async payload => {
    const [err, userObj] = await tryCatchHelper(User.create(payload));
    if (err) return [err];

    const user = userObj.dataValues;

    return [null, user];
  };

  return User;
};
