import * as Boom from 'boom';
import Helpers from '../helpers';
import { Broadcast } from '../models';

const fetchAllBroadcasts = async (request, h) => {
	const broadcasts = await Broadcast.findAll();

	return h.response(broadcasts);
};

const createBroadcast = async (request, h) => {
	const [err, broadcast] = await Helpers.tryCatch(Broadcast.create(request.payload));

	if (err) return Boom.badRequest(err);

	return h.response({ id: broadcast.id });
};

const updateBroadcast = async (request, h) => {
	const { id } = request.params;

	const [err, broadcast] = await Helpers.tryCatch(Broadcast.update(request.payload, { where: { id } }));

	if (err) return Boom.badRequest(err);

	return h.response({ id });
};

const deleteBroadcast = async (request, h) => {
	const { id } = request.params;

	const broadcast = await Broadcast.findByPk(id);
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
