import * as Boom from 'boom';
import Helpers from '../helpers';
import { User, IUser, Lecture, ILecture, Course, ICourse } from '../models';
import { UserFactory, CourseFactory, LectureFactory } from '../factories';

const fetchMe = async (request, h) => {
	const {
		auth: {
			credentials: { id },
		},
	} = request;

	const me = await (User.findByPk(id) as Promise<IUser>);

	return h.response(
		UserFactory.init(me)
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
		UserFactory.init(me)
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
		CourseFactory.init(myCourses)
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
		LectureFactory.init(myLectures)
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
