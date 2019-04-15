const server = {
	host: process.env.SERVER_HOST,
	port: process.env.SERVER_PORT,
}

const db = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	host: process.env.SERVER_HOST,
	dialect: 'postgres',
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
	server,
	db,
	JWT_SECRET_KEY
}