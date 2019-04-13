const Boom = require('boom');
const { Lecture } = require('../models');
const { tryCatchHelper } = require('../helpers/formatting');

const fetchAllLectures = async (request, h) => {
	const lectures = await Lecture.findAll();

	const filteredLectures = lectures.filter(lecture => lecture.deletedAt === null);

	return h.response(filteredLectures);
}

const fetchLectureById = async (request, h) => {
	const { id } = request.params;

	const lecture = await Lecture.findByPk(id);

	return h.response(lecture);
}

const createLecture = async (request, h) => {
	let err, lecture;

	[err, lecture] = await tryCatchHelper(Lecture.create(request.payload));
	if (err)
		return Boom.badRequest('formatted error');

	return h.response({ id: lecture.id });
}

const updateLecture = async (request, h) => {
	const { id } = request.params;
	let err, lecture;

	[err, lecture] = await tryCatchHelper(Lecture.update(request.payload, { where: { id } }));
	if (err)
		return Boom.badRequest('formatted error');

	return h.response({ id });
}

const deleteLecture = async (request, h) => {
	const { id } = request.params;
	let err, lecture;

	[err, lecture] = await tryCatchHelper(Lecture.update({ deletedAt: new Date() }, { where: { id } }));
	if (err)
		return Boom.badRequest('formatted error');

	return h.response();
}

const lecturesCtrl = {
	fetchAllLectures,
	fetchLectureById,
	createLecture,
	updateLecture,
	deleteLecture
}

module.exports = lecturesCtrl;
