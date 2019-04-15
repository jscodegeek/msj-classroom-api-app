const hc = {
	method: 'GET',
	path: '/hc',
	handler: (request, h) => h.response('Я, и моя молодая команда, делаем, что-то важное...')
};

module.exports = [
	hc,
	...require('./broadcasts'),
	...require('./lectures'),
	...require('./messages'),
	...require('./users')
];