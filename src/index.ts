import * as Hapi from 'hapi';
import config from './config';
import routes from './routes';
import initPlugins from './plugins';

const { host, port } = config[config.ENVIRONMENT].server;

const server = new Hapi.Server({
	host,
	port,
	routes: {
		cors: {
			origin: ['*'],
			additionalHeaders: [
				'access-control-allow-headers',
				'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type',
				'event-changes-notification',
			],
			additionalExposedHeaders: [
				'access-control-allow-headers',
				'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type',
				'event-changes-notification',
			],
			credentials: true,
		},
	},
});

server.realm.modifiers.route.prefix = '/api';

const start = async () => {
	await initPlugins(server);
	server.route(routes);
	await server.start();
	console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
	console.log(err);
	process.exit(1);
});

start();

export default server;
