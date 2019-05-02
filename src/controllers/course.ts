import * as Boom from 'boom';
import * as _ from 'lodash';
import Helpers from '../helpers';
import { PROP_NAMES } from '../shared/variables';
import { Course, ICourse, User, Lecture } from '../models';
import { CourseFactory } from '../factories';

const fetchAllCourses = async (request, h) => {
	const { authorization } = request.headers;
	let userId = null;

	const courses = await (Course.findAll({ include: [{ model: User }, { model: Lecture }] }) as Promise<ICourse[]>);

	if (authorization) {
		const [err, decoded] = User.decodeToken(authorization);
		if (!err) userId = decoded.id;
	}

	return h.response(
		CourseFactory.init(courses)
			.addPropsToWhiteList(PROP_NAMES.IS_SUBSCRIBED)
			.addIsSubscribedProp(userId)
			.removeUnsafeProps()
			.build(),
	);
};

const fetchCourseById = async (request, h) => {
	const {
		params: { id },
		headers: { authorization },
	} = request;
	let userId = null;

	const course = await (Course.findByPk(id, { include: [{ model: User }] }) as Promise<ICourse>);
	if (course === null) return Boom.notFound();

	if (authorization) {
		const [err, decoded] = User.decodeToken(authorization);
		if (!err) userId = decoded.id;
	}

	return h.response(
		CourseFactory.init(course)
			.addPropsToWhiteList(PROP_NAMES.IS_SUBSCRIBED)
			.addIsSubscribedProp(userId)
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
