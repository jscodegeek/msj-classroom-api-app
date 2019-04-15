const Boom = require('boom');
const { User } = require('../models');
const { tryCatchHelper } = require('../helpers/formatting');

const fetchAllUsers = async (request, h) => {
	const users = await User.findAll();

	return h.response(users);
}

const fetchUserById = async (request, h) => {
	const { id } = request.params;

	const user = await User.findByPk(id);

	return h.response(user);
}

const updateUser = async (request, h) => {
	const { id } = request.params;
	let err, user;

	[err, user] = await tryCatchHelper(User.update(request.payload, { where: { id } }));
	if (err)
		return Boom.badRequest('formatted error');

	return h.response();
}


const deleteUser = async (request, h) => {
	const { id } = request.params;
	let err, user;

	[err, user] = await tryCatchHelper(User.update({ deletedAt: new Date() }, { where: { id } }));
	if (err)
		return Boom.badRequest('formatted error');

	return h.response();
}

const signIn = async (request, h) => {
	let err, user;

	[err, user] = await tryCatchHelper(User.findByCredentials(request.payload));
	if (err)
		return Boom.badRequest('formatted error');

	const authToken = await User.generateJwtToken(user);

	return h.response({ authToken });
}

const signUp = async (request, h) => {
	let err, user;

	[err, user] = await User.createUser({ ...request.payload, role: 'STUDENT' });
	if (err)
		return Boom.badRequest('formatted error');

	const authToken = await User.generateJwtToken(user);

	return h.response({ authToken });
}

const validateToken = async (request, h) => {
	let err, decoded;
	const { authToken } = request.payload;

	[err, decoded] = await User.decodeToken(authToken);
	if (err)
		return Boom.badRequest(err);

	return h.response();
}

const usersCtrl = {
	fetchAllUsers,
	fetchUserById,
	updateUser,
	deleteUser,
	signIn,
	signUp,
	validateToken
}

module.exports = usersCtrl;
