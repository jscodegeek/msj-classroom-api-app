import * as Boom from 'boom';
import Helpers, { ObjectFactory } from '../helpers';
import { USER_SCOPES, ENTITY_TYPES } from '../shared/variables';
import { User, IUser, Lecture, ILecture, Course, ICourse } from '../models';

const fetchMe = async (request, h) => {
	const {
		auth: {
			credentials: { id },
		},
	} = request;

	const me = await (User.findByPk(id) as Promise<IUser>);

	return h.response(
		ObjectFactory.init({
			data: me,
			scope: USER_SCOPES.STUDENT,
			entity: ENTITY_TYPES.USER,
		})
			.removeUnsafeProps()
			.build(),
	);
};

const updateMe = async (request, h) => {
	const {
		auth: {
			credentials: { id, scope },
		},
		payload,
	} = request;

	const [err, me] = await Helpers.tryCatch(User.update({ ...payload, scope }, { where: { id } }) as Promise<IUser>);
	if (err) return Boom.badRequest(err);

	return h.response(
		ObjectFactory.init({
			data: me,
			scope: USER_SCOPES.STUDENT,
			entity: ENTITY_TYPES.USER,
		})
			.removeUnsafeProps()
			.build(),
	);
};

const fetchMyCourses = async (request, h) => {
	const {
		auth: {
			credentials: { id },
		},
	} = request;

	const myCourses = await (Course.findAll({
		include: [
			{
				model: User,
				where: { id },
			},
		],
	}) as Promise<ICourse[]>);

	return h.response(
		ObjectFactory.init({
			data: myCourses,
			scope: USER_SCOPES.STUDENT,
			entity: ENTITY_TYPES.COURSE,
		})
			.removeUnsafeProps()
			.build(),
	);
};

const fetchMyLectures = async (request, h) => {
	const {
		auth: {
			credentials: { id },
		},
	} = request;

	const myLectures = await (Lecture.findAll({
		include: [
			{
				model: User,
				where: { id },
			},
		],
	}) as Promise<ILecture[]>);

	return h.response(
		ObjectFactory.init({
			data: myLectures,
			scope: USER_SCOPES.STUDENT,
			entity: ENTITY_TYPES.LECTURE,
		})
			.removeUnsafeProps()
			.build(),
	);
};

export default {
	fetchMe,
	updateMe,
	fetchMyCourses,
	fetchMyLectures,
};
