import * as Boom from 'boom';
import Helpers from '../helpers';
import { Course, User, Lecture } from '../models';

const fetchAllCourses = async (request, h) => {
	const courses = await Course.findAll({ include: [{ model: User }, { model: Lecture }] });

	return h.response(courses);
};

const fetchCourseById = async (request, h) => {
	const {
		params: { id },
	} = request;

	const course = await Course.findByPk(id);
	if (course === null) return Boom.notFound();

	return h.response(course);
};

const createCourse = async (request, h) => {
	const { payload } = request;

	const [err, course] = await Helpers.tryCatch(Course.create(payload));
	if (err) return Boom.badRequest(err);

	return h.response({ id: course.id });
};

const updateCourse = async (request, h) => {
	const {
		payload,
		params: { id },
	} = request;

	const [err, course] = await Helpers.tryCatch(Course.update(payload, { where: { id } }));
	if (err) return Boom.badRequest(err);

	return h.response({ id });
};

const deleteCourse = async (request, h) => {
	const {
		params: { id },
	} = request;

	const course = await Course.findByPk(id);
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
