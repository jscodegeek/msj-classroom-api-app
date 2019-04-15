const Hapi = require('hapi');
const config = require('./config');
const routes = require('./routes');

const { host, port } = config[config.ENVIRONMENT].server;

const server = Hapi.server({
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
  server.route(routes);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

start();

module.exports = server;
