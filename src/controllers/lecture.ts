import * as Boom from 'boom';
import Helpers, { ObjectFactory } from '../helpers';
import { Lecture, ILecture, User } from '../models';
import { USER_SCOPES, ENTITY_TYPES, PROP_NAMES } from '../shared/variables';

const fetchAllLectures = async (request, h) => {
	const lectures = await (Lecture.findAll() as Promise<ILecture[]>);

	return h.response(
		ObjectFactory.init({
			data: lectures,
			scope: USER_SCOPES.STUDENT,
			entity: ENTITY_TYPES.LECTURE,
		})
			.removeUnsafeProps()
			.build(),
	);
};

const fetchLectureById = async (request, h) => {
	const {
		params: { id },
		headers: { authorization },
	} = request;
	let result = {};

	const lecture = await (Lecture.findByPk(id, { include: [{ model: User }] }) as Promise<ILecture>);
	if (lecture === null) return Boom.notFound();

	if (!authorization) {
		result = Helpers.addIsSubscribedProp(lecture, null);
	} else {
		const [err, decoded] = User.decodeToken(authorization);
		if (!err) {
			result = Helpers.addIsSubscribedProp(lecture, decoded.id);
		}
	}

	return h.response(
		ObjectFactory.init({
			data: result,
			scope: USER_SCOPES.STUDENT,
			entity: ENTITY_TYPES.LECTURE,
		})
			.addPropsToWhiteList(PROP_NAMES.IS_SUBSCRIBED)
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
