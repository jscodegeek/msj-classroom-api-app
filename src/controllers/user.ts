import * as Boom from 'boom';
import Helpers from '../helpers';
import { User, IUser, Subscription, ISubscription } from '../models';

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

const subscribe = async (request, h) => {
	const {
		payload: { entity, id },
		params: { userId },
	} = request;

	const [err, subscription] = await Helpers.tryCatch(Subscription.create({
		userId,
		subscribable: entity,
		subscribableId: id,
	}) as Promise<ISubscription>);
	if (err) return Boom.badRequest(err);

	return h.response();
};

const unsubscribe = async (request, h) => {
	const {
		payload: { entity, id },
		params: { userId },
	} = request;

	const subscription = await (Subscription.findOne({
		where: {
			userId,
			subscribable: entity,
			subscribableId: id,
		},
	}) as Promise<ISubscription>);
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
