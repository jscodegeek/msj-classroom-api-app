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
				scope: {
					allowNull: false,
					type: DataTypes.STRING,
				},
				deletedAt: Sequelize.DATE,
			},
			{
				sequelize,
				paranoid: true,
				modelName: 'user',
				hooks: {
					beforeCreate: hashPassword,
					beforeUpdate: hashPassword,
				},
			},
		);

		return User;
	}

	static associate(models) {
		User.belongsToMany(models.Course, {
			foreignKey: 'userId',
			constraints: false,
			through: {
				model: models.Subscription,
				unique: false,
				scope: {
					subscribable: 'course',
				},
			},
		});

		User.belongsToMany(models.Lecture, {
			foreignKey: 'userId',
			constraints: false,
			through: {
				model: models.Subscription,
				unique: false,
				scope: {
					subscribable: 'lecture',
				},
			},
		});
	}

	static decodeToken = (token: string): [null, string | object] | [string] => {
		try {
			const decoded = Jwt.verify(token, JWT_SECRET_KEY);
			return [null, decoded];
		} catch (err) {
			return ['token is invalid'];
		}
	};

	static findByCredentials = async ({ login, password }) => {
		const user = await User.findOne({ where: { login } });
		if (user === null) return ['user with provided login does not exist'];

		const [err, match] = await Helpers.tryCatch(Bcrypt.compare(password, user.get('password')));
		if (!match) return ['wrong password'];

		return [null, user];
	};

	static generateJwtToken = user => {
		const userSignData = _.cloneDeep(user);
		delete userSignData.password;

		const token = Jwt.sign(userSignData, JWT_SECRET_KEY);

		return token;
	};
}
