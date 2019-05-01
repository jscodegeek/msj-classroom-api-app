import * as Boom from 'boom';
import Helpers from '../helpers';
import { USER_SCOPES } from '../shared/variables';
import { User, IUser } from '../models';

const signIn = async (request, h) => {
	const { payload } = request;

	const [err, user] = await User.findByCredentials(payload);
	if (err) return Boom.badRequest(err);

	const authToken = User.generateJwtToken(user);

	return h.response({ authToken });
};

const signUp = async (request, h) => {
	const { payload } = request;

	const [err, user] = await Helpers.tryCatch(User.create({ ...payload, scope: USER_SCOPES.STUDENT }) as Promise<IUser>);
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
