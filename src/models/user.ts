import * as Sequelize from 'sequelize';
import * as Bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import Helpers from '../helpers';
import config from '../config';

const { JWT_SECRET_KEY } = config[config.ENVIRONMENT];

const hashPassword = async (user, options) => {
	const salt = await Bcrypt.genSalt(10);
	const hash = await Bcrypt.hash(user.password, salt);
	user.password = hash;
};

export default class User extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		super.init(
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
				sequelize,
				timestamps: true,
				freezeTableName: true,
				tableName: 'users',
				modelName: 'user',
				hooks: {
					beforeCreate: hashPassword,
					beforeUpdate: hashPassword,
				},
			},
		);

		return User;
	}

	static decodeToken = token => {
		let decoded;

		try {
			decoded = Jwt.verify(token, JWT_SECRET_KEY);
		} catch (err) {
			return ['token is invalid'];
		}

		return [null, decoded];
	};

	static findByCredentials = async ({ login, password }) => {
		const userObj: any = await User.findOne({ where: { login } });
		if (userObj === null) return ['user with provided login does not exist'];

		const user = userObj.dataValues;

		const [err, match] = await Helpers.tryCatch(Bcrypt.compare(password, user.password));
		if (!match) return ['wrong password'];

		return [null, user];
	};

	static generateJwtToken = userObj => {
		const user = _.cloneDeep(userObj);
		delete user.password;

		const token = Jwt.sign(user, JWT_SECRET_KEY);

		return token;
	};
}
