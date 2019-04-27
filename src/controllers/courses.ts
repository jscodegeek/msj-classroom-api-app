import * as Boom from 'boom';
import Helpers from '../helpers';
import { Course, User } from '../models';

const fetchAllCourses = async (request, h) => {
	const courses = await Course.findAll({ include: [{ model: User }] });

	return h.response(courses);
};

const fetchCourseById = async (request, h) => {
	const { id } = request.params;

	const course = await Course.findByPk(id);
	if (course === null) return Boom.notFound();

	return h.response(course);
};

const createCourse = async (request, h) => {
	const [err, course] = await Helpers.tryCatch(Course.create(request.payload));

	if (err) return Boom.badRequest(err);

	return h.response({ id: course.id });
};

const updateCourse = async (request, h) => {
	const { id } = request.params;

	const [err, course] = await Helpers.tryCatch(Course.update(request.payload, { where: { id } }));

	if (err) return Boom.badRequest(err);

	return h.response({ id });
};

const deleteCourse = async (request, h) => {
	const { id } = request.params;

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
