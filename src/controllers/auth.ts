import * as Boom from 'boom';
import Helpers from '../helpers';
import { User } from '../models';

const signIn = async (request, h) => {
	const { payload } = request;

	const [err, user] = await User.findByCredentials(payload);
	if (err) return Boom.badRequest(err);

	const authToken = User.generateJwtToken(user);

	return h.response({ authToken });
};

const signUp = async (request, h) => {
	const { payload } = request;

	const [err, user] = await Helpers.tryCatch(User.create({ ...payload, scope: 'STUDENT' }));
	if (err) return Boom.badRequest(err);

	const authToken = User.generateJwtToken(user);

	return h.response({ authToken });
};

const validateToken = async (request, h) => {
	const {
		payload: { authToken },
	} = request;

	const [err, decoded] = User.decodeToken(authToken);
	if (err) return Boom.badRequest(err);

	return h.response();
};

export default {
	signIn,
	signUp,
	validateToken,
};
