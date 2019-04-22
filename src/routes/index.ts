import broadcasts from './broadcasts';
import lectures from './lectures';
import messages from './messages';
import users from './users';

const hc = {
	method: 'GET',
	path: '/hc',
	handler: (request, h) => h.response('Я, и моя молодая команда, делаем, что-то важное...'),
};

export default [hc, ...broadcasts, ...lectures, ...messages, ...users];
