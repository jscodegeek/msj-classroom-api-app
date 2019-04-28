import { messageCtrl } from '../controllers';
import { id, author, text, type } from './variables';

const routes = [
	{
		method: 'GET',
		path: '/messages',
		config: {
			handler: messageCtrl.fetchAllMessages,
			tags: ['api', 'messages'],
			description: 'fetch all messages',
		},
	},
	{
		method: 'POST',
		path: '/messages',
		config: {
			handler: messageCtrl.createMessage,
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
