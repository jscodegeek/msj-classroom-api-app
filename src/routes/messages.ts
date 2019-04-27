import { messagesCtrl } from '../controllers';
import { id, author, text, type } from './variables';

const routes = [
	{
		method: 'GET',
		path: '/messages',
		config: {
			handler: messagesCtrl.fetchAllMessages,
			tags: ['api', 'messages'],
			description: 'get all messages',
		},
	},
	{
		method: 'POST',
		path: '/messages',
		config: {
			handler: messagesCtrl.createMessage,
			tags: ['api', 'messages'],
			description: 'create new message',
			validate: {
				payload: {
					author,
					text,
					type,
					broadcastId: id,
				},
			},
		},
	},
];

export default routes;
