import * as Boom from 'boom';
import Helpers from '../helpers';
import { Lecture } from '../models';

const fetchAllLectures = async (request, h) => {
	const lectures = await Lecture.findAll();

	const filteredLectures = lectures.filter(lecture => lecture.deletedAt === null);

	return h.response(filteredLectures);
};

const fetchLectureById = async (request, h) => {
	const { id } = request.params;

	const lecture = await Lecture.findByPk(id);
	if (lecture === null) return Boom.notFound();

	return h.response(lecture);
};

const createLecture = async (request, h) => {
	const [err, lecture] = await Helpers.tryCatch(Lecture.create(request.payload));

	if (err) return Boom.badRequest(err);

	return h.response({ id: lecture.id });
};

const updateLecture = async (request, h) => {
	const { id } = request.params;

	const [err, lecture] = await Helpers.tryCatch(Lecture.update(request.payload, { where: { id } }));

	if (err) return Boom.badRequest(err);

	return h.response({ id });
};

const deleteLecture = async (request, h) => {
	const { id } = request.params;

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
