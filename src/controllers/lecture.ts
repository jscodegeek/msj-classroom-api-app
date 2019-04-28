import * as Boom from 'boom';
import Helpers from '../helpers';
import { Lecture, User } from '../models';

const fetchAllLectures = async (request, h) => {
	const lectures = await Lecture.findAll({ include: [{ model: User }] });

	return h.response(lectures);
};

const fetchLectureById = async (request, h) => {
	const {
		params: { id },
	} = request;

	const lecture = await Lecture.findByPk(id);
	if (lecture === null) return Boom.notFound();

	return h.response(lecture);
};

const createLecture = async (request, h) => {
	const { payload } = request;

	const [err, lecture] = await Helpers.tryCatch(Lecture.create(payload));
	if (err) return Boom.badRequest(err);

	return h.response({ id: lecture.id });
};

const updateLecture = async (request, h) => {
	const {
		payload,
		params: { id },
	} = request;

	const [err, lecture] = await Helpers.tryCatch(Lecture.update(payload, { where: { id } }));
	if (err) return Boom.badRequest(err);

	return h.response({ id });
};

const deleteLecture = async (request, h) => {
	const {
		params: { id },
	} = request;

	const lecture = await Lecture.findByPk(id);
	if (lecture === null) return Boom.notFound();

	await Lecture.destroy({ where: { id } });

	return h.response();
};

export default {
	fetchAllLectures,
	fetchLectureById,
	createLecture,
	updateLecture,
	deleteLecture,
};
