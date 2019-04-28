import * as Inert from 'inert';
import * as Vision from 'vision';
import * as HapiSwagger from 'hapi-swagger';

const options = {
	info: {
		title: 'msj-classroom-api-app API documentation',
		version: '1.0.0',
	},
	grouping: 'tags',
};

export default async server => {
	await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options,
		},
	]);
};
