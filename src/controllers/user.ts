import * as Boom from 'boom';
import Helpers from '../helpers';
import { User, Lecture, Course, Subscription } from '../models';

const fetchAllUsers = async (request, h) => {
	const users = await User.findAll({ include: [{ model: Course }, { model: Lecture }] });

	return h.response(users);
};

const fetchUserById = async (request, h) => {
	const {
		params: { id },
	} = request;

	const user = await User.findByPk(id);

	return h.response(user);
};

const updateUser = async (request, h) => {
	const {
		payload,
		params: { id },
	} = request;

	const [err, user] = await Helpers.tryCatch(User.update(payload, { where: { id } }));
	if (err) return Boom.badRequest(err);

	return h.response(user);
};

const deleteUser = async (request, h) => {
	const {
		params: { id },
	} = request;

	const user = await User.findByPk(id);
	if (user === null) return Boom.notFound();

	await User.destroy({ where: { id } });

	return h.response();
};

const subscribe = async (request, h) => {
	const {
		payload: { entity, id },
		params: { userId },
	} = request;

	const [err, subscription] = await Helpers.tryCatch(
		Subscription.create({
			userId,
			subscribable: entity,
			subscribableId: id,
		}),
	);
	if (err) return Boom.badRequest(err);

	return h.response();
};

const unsubscribe = async (request, h) => {
	const {
		payload: { entity, id },
		params: { userId },
	} = request;

	const subscription = await Subscription.findOne({
		where: {
			userId,
			subscribable: entity,
			subscribableId: id,
		},
	});
	if (subscription === null) return Boom.notFound();

	await Subscription.destroy({
		where: {
			userId,
			subscribable: entity,
			subscribableId: id,
		},
	});

	return h.response();
};

export default {
	fetchAllUsers,
	fetchUserById,
	updateUser,
	deleteUser,
	subscribe,
	unsubscribe,
};
