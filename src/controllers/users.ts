import * as Boom from 'boom';
import Helpers from '../helpers';
import { User } from '../models';

const fetchAllUsers = async (request, h) => {
	const users = await User.findAll();

	return h.response(users);
};

const fetchUserById = async (request, h) => {
	const { id } = request.params;

	const user = await User.findByPk(id);

	return h.response(user);
};

const updateUser = async (request, h) => {
	const { id } = request.params;

	const [err, user] = await Helpers.tryCatch(User.update(request.payload, { where: { id } }));

	if (err) return Boom.badRequest(err);

	return h.response();
};

const deleteUser = async (request, h) => {
	const { id } = request.params;

	const [err, user] = await Helpers.tryCatch(User.update({ deletedAt: new Date() }, { where: { id } }));

	if (err) return Boom.badRequest(err);

	return h.response();
};

const signIn = async (request, h) => {
	const [err, user] = await User.findByCredentials(request.payload);

	if (err) return Boom.badRequest(err);

	const authToken = User.generateJwtToken(user);

	return h.response({ authToken });
};

const signUp = async (request, h) => {
	const [err, user] = await Helpers.tryCatch(User.create({ ...request.payload, role: 'STUDENT' }));

	if (err) return Boom.badRequest(err);

	const authToken = User.generateJwtToken(user.dataValues);

	return h.response({ authToken });
};

const validateToken = async (request, h) => {
	const { authToken } = request.payload;

	const [err, decoded] = User.decodeToken(authToken);

	if (err) return Boom.badRequest(err);

	return h.response();
};

export default {
	fetchAllUsers,
	fetchUserById,
	updateUser,
	deleteUser,
	signIn,
	signUp,
	validateToken,
};
