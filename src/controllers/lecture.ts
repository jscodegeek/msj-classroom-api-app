import * as Boom from 'boom';
import Helpers from '../helpers';
import { PROP_NAMES } from '../shared/variables';
import { Lecture, ILecture, Course, User } from '../models';
import { LectureFactory } from '../factories';

const fetchAllLectures = async (request, h) => {
	const lectures = await (Lecture.findAll() as Promise<ILecture[]>);

	return h.response(
		LectureFactory.init(lectures)
			.removeUnsafeProps()
			.build(),
	);
};

const fetchLectureById = async (request, h) => {
	const {
		params: { id },
		headers: { authorization },
	} = request;
	let userId = null;

	const lecture = await (Lecture.findByPk(id, {
		include: [{ model: User }, { model: Course }],
	}) as Promise<ILecture>);
	if (lecture === null) return Boom.notFound();

	if (authorization) {
		const [err, decoded] = User.decodeToken(authorization);
		if (!err) userId = decoded.id;
	}

	return h.response(
		LectureFactory.init(lecture)
			.addPropsToWhiteList(PROP_NAMES.IS_SUBSCRIBED)
			.addIsSubscribedProp(userId)
			.removeUnsafeProps()
			.build(),
	);
};

const createLecture = async (request, h) => {
	const { payload } = request;

	const [err, lecture] = await Helpers.tryCatch(Lecture.create(payload) as Promise<ILecture>);
	if (err) return Boom.badRequest(err);

	return h.response({ id: lecture.id });
};

const updateLecture = async (request, h) => {
	const {
		payload,
		params: { id },
	} = request;

	const [err, lecture] = await Helpers.tryCatch(Lecture.update(payload, { where: { id } }) as Promise<ILecture>);
	if (err) return Boom.badRequest(err);

	return h.response({ id });
};

const deleteLecture = async (request, h) => {
	const {
		params: { id },
	} = request;

	const lecture = await (Lecture.findByPk(id) as Promise<ILecture>);
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
