const Boom = require('boom');
const { Message } = require('../models');
const { tryCatchHelper } = require('../helpers/formatting');

const fetchAllMessages = async (request, h) => {
	const messages = await Message.findAll();

	return h.response(messages);
}

const createMessage = async (request, h) => {
	let err, message;

	[err, message] = await tryCatchHelper(Message.create(request.payload));
	if (err)
		return Boom.badRequest('formatted error');

	return h.response({ id: message.id });
}

const messagesCtrl = {
	fetchAllMessages,
	createMessage
}

module.exports = messagesCtrl;
