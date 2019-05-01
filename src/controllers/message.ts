import * as Boom from 'boom';
import Helpers from '../helpers';
import { Message, IMessage } from '../models';

const fetchAllMessages = async (request, h) => {
	const messages = await (Message.findAll() as Promise<IMessage[]>);

	return h.response(messages);
};

const createMessage = async (request, h) => {
	const { payload } = request;

	const [err, message] = await Helpers.tryCatch(Message.create(payload) as Promise<IMessage>);
	if (err) return Boom.badRequest(err);

	return h.response({ id: message.id });
};

export default {
	fetchAllMessages,
	createMessage,
};
