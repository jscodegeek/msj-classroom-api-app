import * as Boom from 'boom';
import { User } from '../models';

const scheme = (server, options) => {
	return {
		authenticate: (request, h) => {
			const { authorization } = request.headers;
			if (!authorization) return Boom.unauthorized();

			const [err, user] = User.decodeToken(authorization);
			if (err) return Boom.badRequest(err);

			return h.authenticated({ credentials: user });
		},
	};
};

export default server => {
	server.auth.scheme('jwt', scheme);
	server.auth.strategy('jwt', 'jwt');
};
