const {
  SERVER_HOST, SERVER_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, JWT_SECRET_KEY,
} = process.env;

const server = {
  host: SERVER_HOST,
  port: SERVER_PORT,
};

const db = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: SERVER_HOST,
  dialect: 'postgres',
};

module.exports = {
  server,
  db,
  JWT_SECRET_KEY,
};
