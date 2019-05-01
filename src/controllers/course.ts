import * as Boom from 'boom';
import * as _ from 'lodash';
import Helpers, { ObjectFactory } from '../helpers';
import { USER_SCOPES, ENTITY_TYPES, PROP_NAMES } from '../shared/variables';
import { Course, ICourse, User, Lecture } from '../models';

const fetchAllCourses = async (request, h) => {
	const { authorization } = request.headers;
	let result = {};

	const courses = await (Course.findAll({ include: [{ model: User }, { model: Lecture }] }) as Promise<ICourse[]>);

	if (!authorization) {
		result = Helpers.addIsSubscribedProp(courses, null);
	} else {
		const [err, decoded] = User.decodeToken(authorization);
		if (!err) {
			result = Helpers.addIsSubscribedProp(courses, decoded.id);
		}
	}

	return h.response(
		ObjectFactory.init({
			data: result,
			scope: USER_SCOPES.STUDENT,
			entity: ENTITY_TYPES.COURSE,
		})
			.addPropsToWhiteList(PROP_NAMES.IS_SUBSCRIBED)
			.removeUnsafeProps()
			.build(),
	);
};

const fetchCourseById = async (request, h) => {
	const {
		params: { id },
		headers: { authorization },
	} = request;

	let course = await (Course.findByPk(id, { include: [{ model: User }] }) as Promise<ICourse>);
	if (course === null) return Boom.notFound();

	if (!authorization) {
		course = Helpers.addIsSubscribedProp(course, null);
	} else {
		const [err, decoded] = User.decodeToken(authorization);
		if (!err) {
			course = Helpers.addIsSubscribedProp(course, decoded.id);
		}
	}

	return h.response(
		ObjectFactory.init({
			data: course,
			scope: USER_SCOPES.STUDENT,
			entity: ENTITY_TYPES.COURSE,
		})
			.addPropsToWhiteList(PROP_NAMES.IS_SUBSCRIBED)
			.removeUnsafeProps()
			.build(),
	);
};

const createCourse = async (request, h) => {
	const { payload } = request;

	const [err, course] = await Helpers.tryCatch(Course.create(payload) as Promise<ICourse>);
	if (err) return Boom.badRequest(err);

	return h.response({ id: course.id });
};

const updateCourse = async (request, h) => {
	const {
		payload,
		params: { id },
	} = request;

	const [err, course] = await Helpers.tryCatch(Course.update(payload, { where: { id } }) as Promise<ICourse>);
	if (err) return Boom.badRequest(err);

	return h.response({ id });
};

const deleteCourse = async (request, h) => {
	const {
		params: { id },
	} = request;

	const course = await (Course.findByPk(id) as Promise<ICourse>);
	if (course === null) return Boom.notFound();

	await Course.destroy({ where: { id } });

	return h.response();
};

export default {
	fetchAllCourses,
	fetchCourseById,
	createCourse,
	updateCourse,
	deleteCourse,
};
