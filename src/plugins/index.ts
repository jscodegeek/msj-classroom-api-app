import initSwagger from './swagger';
import initAuth from './auth';

export default async server => {
	initAuth(server);

	return Promise.all([
		initSwagger(server), //
	]);
};
