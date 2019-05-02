import * as Boom from 'boom';
import Helpers from '../helpers';
import { User, IUser, Lecture, ILecture, Course, ICourse, Subscription, ISubscription } from '../models';
import { ENTITY_TYPES } from '../shared/variables';

const fetchAllUsers = async (request, h) => {
	const users = await (User.findAll() as Promise<IUser[]>);

	return h.response(users);
};

const fetchUserById = async (request, h) => {
	const {
		params: { id },
	} = request;

	const user = await (User.findByPk(id) as Promise<IUser>);

	return h.response(user);
};

const updateUser = async (request, h) => {
	const {
		payload,
		params: { id },
	} = request;

	const [err, user] = await Helpers.tryCatch(User.update(payload, { where: { id } }) as Promise<IUser>);
	if (err) return Boom.badRequest(err);

	return h.response(user);
};

const deleteUser = async (request, h) => {
	const {
		params: { id },
	} = request;

	const user = await (User.findByPk(id) as Promise<IUser>);
	if (user === null) return Boom.notFound();

	await User.destroy({ where: { id } });

	return h.response();
};

async function subscribeToCourse({ userId, id }) {
	const course = await (Course.findByPk(id) as Promise<ICourse>);
	if (course === null) return [Boom.notFound()];

	const [err, subscription] = await Helpers.tryCatch(Subscription.create({
		userId,
		subscribable: ENTITY_TYPES.COURSE,
		subscribableId: id,
	}) as Promise<ISubscription>);
	if (err) return [Boom.badRequest(err)];

	return [null];
}

async function subscribeToLecture({ userId, id }) {
	const lecture = await (Lecture.findByPk(id, {
		include: [
			{ model: User },
			{
				model: Course,
				include: [{ model: User }],
			},
		],
	}) as Promise<ILecture>);
	if (lecture === null) return [Boom.notFound()];

	if (lecture.course.users.find((user: IUser) => user.id === userId)) return [null];

	const [err, subscription] = await Helpers.tryCatch(Subscription.create({
		userId,
		subscribable: ENTITY_TYPES.LECTURE,
		subscribableId: id,
	}) as Promise<ISubscription>);
	if (err) return [Boom.badRequest(err)];

	return [null];
}

const subscribe = async (request, h) => {
	const {
		auth: {
			credentials: { id: userId },
		},
		payload: { entity, id },
	} = request;

	const [err, result] =
		entity === ENTITY_TYPES.COURSE ? await subscribeToCourse({ userId, id }) : await subscribeToLecture({ userId, id });
	if (err) return err;

	return result ? h.response(result) : h.response();
};

async function unsubscribeFromCourse({ userId, id }) {
	const course = await (Course.findByPk(id) as Promise<ICourse>);
	if (course === null) return [Boom.notFound()];

	const subscription = await (Subscription.findOne({
		where: {
			userId,
			subscribable: ENTITY_TYPES.COURSE,
			subscribableId: id,
		},
	}) as Promise<ISubscription>);
	if (subscription === null) return [Boom.badRequest()];

	await Subscription.destroy({
		where: {
			userId,
			subscribable: ENTITY_TYPES.COURSE,
			subscribableId: id,
		},
	});

	return [null];
}

async function unsubscribeFromLecture({ userId, id }) {
	const lecture = await (Lecture.findByPk(id, {
		include: [
			{
				model: Course,
				include: [{ model: User }],
			},
		],
	}) as Promise<ILecture>);
	if (lecture === null) return [Boom.notFound()];

	if (lecture.course.users.find((user: IUser) => user.id === userId)) return [Boom.badRequest()];

	const subscription = await (Subscription.findOne({
		where: {
			userId,
			subscribable: ENTITY_TYPES.LECTURE,
			subscribableId: id,
		},
	}) as Promise<ISubscription>);
	if (subscription === null) return [Boom.badRequest()];

	await Subscription.destroy({
		where: {
			userId,
			subscribable: ENTITY_TYPES.LECTURE,
			subscribableId: id,
		},
	});

	return [null];
}

const unsubscribe = async (request, h) => {
	const {
		auth: {
			credentials: { id: userId },
		},
		payload: { entity, id },
	} = request;

	const [err, result] =
		entity === ENTITY_TYPES.COURSE
			? await unsubscribeFromCourse({ userId, id })
			: await unsubscribeFromLecture({ userId, id });
	if (err) return err;

	return result ? h.response(result) : h.response();
};

export default {
	fetchAllUsers,
	fetchUserById,
	updateUser,
	deleteUser,
	subscribe,
	unsubscribe,
};
