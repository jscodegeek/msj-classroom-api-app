import * as Boom from 'boom';
import Helpers from '../helpers';
import { Message } from '../models';

const fetchAllMessages = async (request, h) => {
	const messages = await Message.findAll();

	return h.response(messages);
};

const createMessage = async (request, h) => {
	const [err, message] = await Helpers.tryCatch(Message.create(request.payload));

	if (err) return Boom.badRequest(err);

	return h.response({ id: message.id });
};

export default {
	fetchAllMessages,
	createMessage,
};
