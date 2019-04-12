const Boom = require('boom');
const { Broadcast } = require('../models');
const { tryCatchHelper } = require('../helpers/formatting');

const fetchAllBroadcasts = async (request, h) => {
	const broadcasts = await Broadcast.findAll();

	return h.response(broadcasts);
}

const createBroadcast = async (request, h) => {
	let err, broadcast;

	[err, broadcast] = await tryCatchHelper(Broadcast.create(request.payload));
	if (err)
		return Boom.badRequest('formatted error');

	return h.response({ id: broadcast.id });
}

const updateBroadcast = async (request, h) => {
	const { broadcastId } = request.params;
	let err, broadcast;

	[err, broadcast] = await tryCatchHelper(Broadcast.update(request.payload, { where: { id: broadcastId } }));
	if (err)
		return Boom.badRequest('formatted error');

	return h.response({ id: broadcastId });
}

const deleteBroadcast = async (request, h) => {
	const { broadcastId } = request.params;
	let err, broadcast;

	[err, broadcast] = await tryCatchHelper(Broadcast.destroy({ where: { id: broadcastId } }));
	if (err)
		return Boom.badRequest('formatted error');

	return h.response();
}

const broadcastsCtrl = {
	fetchAllBroadcasts,
	createBroadcast,
	updateBroadcast,
	deleteBroadcast
}

module.exports = broadcastsCtrl;
