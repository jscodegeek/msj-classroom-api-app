import * as Boom from 'boom';
import Helpers from '../helpers';
import { Broadcast, IBroadcast } from '../models';

const fetchAllBroadcasts = async (request, h) => {
	const broadcasts = await Broadcast.findAll();

	return h.response(broadcasts);
};

const createBroadcast = async (request, h) => {
	const { payload } = request;

	const [err, broadcast] = await Helpers.tryCatch(Broadcast.create(payload) as Promise<IBroadcast>);
	if (err) return Boom.badRequest(err);

	return h.response({ id: broadcast.id });
};

const updateBroadcast = async (request, h) => {
	const {
		payload,
		params: { id },
	} = request;

	const [err, broadcast] = await Helpers.tryCatch(Broadcast.update(payload, { where: { id } }) as Promise<IBroadcast>);
	if (err) return Boom.badRequest(err);

	return h.response({ id });
};

const deleteBroadcast = async (request, h) => {
	const {
		params: { id },
	} = request;

	const broadcast = await (Broadcast.findByPk(id) as Promise<IBroadcast>);
	if (broadcast === null) return Boom.notFound();

	await Broadcast.destroy({ where: { id } });

	return h.response();
};

export default {
	fetchAllBroadcasts,
	createBroadcast,
	updateBroadcast,
	deleteBroadcast,
};
