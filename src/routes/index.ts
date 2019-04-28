import auth from './auth';
import broadcast from './broadcast';
import course from './course';
import lecture from './lecture';
import me from './me';
import message from './message';
import user from './user';

const hc = {
	method: 'GET',
	path: '/hc',
	handler: (request, h) => h.response('Я, и моя молодая команда, делаем, что-то важное...'),
};

export default [
	hc, //
	...auth,
	...broadcast,
	...course,
	...lecture,
	...me,
	...message,
	...user,
];
