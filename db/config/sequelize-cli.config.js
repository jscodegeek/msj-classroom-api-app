const { SERVER_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

module.exports = {
	development: {
		username: 'msgcr_dev_username',
		password: 'msgcr_dev_password',
		database: 'msgcr_dev_db',
		host: '127.0.0.1',
		dialect: 'postgres',
	},
	production: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_DATABASE,
		host: SERVER_HOST,
		dialect: 'postgres',
	},
};
