import * as Boom from 'boom';
import Helpers from '../helpers';
import { User, Lecture, Course } from '../models';

const fetchMe = async (request, h) => {
	const {
		auth: {
			credentials: { id },
		},
	} = request;

	const me = await User.findByPk(id);

	return h.response(me);
};

const updateMe = async (request, h) => {
	const {
		auth: {
			credentials: { id, scope },
		},
		payload,
	} = request;

	const [err, me] = await Helpers.tryCatch(User.update({ ...payload, scope }, { where: { id } }));
	if (err) return Boom.badRequest(err);

	return h.response(me);
};

const fetchMyCourses = async (request, h) => {
	const {
		auth: {
			credentials: { id },
		},
	} = request;

	const me = await User.findByPk(id, { include: [{ model: Course }] });

	return h.response(me.courses);
};

const fetchMyLectures = async (request, h) => {
	const {
		auth: {
			credentials: { id },
		},
	} = request;

	const me = await User.findByPk(id, { include: [{ model: Lecture }] });

	return h.response(me.lectures);
};

export default {
	fetchMe,
	updateMe,
	fetchMyCourses,
	fetchMyLectures,
};
