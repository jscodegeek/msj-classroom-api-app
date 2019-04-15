const server = {
	host: '127.0.0.1',
	port: 3003,
}

const db = {
	username: 'msgcr_dev_username',
	password: 'msgcr_dev_password',
	database: 'msgcr_dev_db',
	host: '127.0.0.1',
	dialect: 'postgres'
}

const JWT_SECRET_KEY = 'JWT_SECRET_KEY';

module.exports = {
	server,
	db,
	JWT_SECRET_KEY
}