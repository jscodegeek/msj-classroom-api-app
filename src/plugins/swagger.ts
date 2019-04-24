import * as HapiSwagger from 'hapi-swagger';

const options = {
	info: {
		title: 'msj-classroom-api-app API documentation',
		version: '1.0.0',
	},
	grouping: 'tags',
};

export default {
	plugin: HapiSwagger,
	options,
};
