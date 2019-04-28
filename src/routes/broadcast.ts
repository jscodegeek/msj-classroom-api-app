import { broadcastCtrl } from '../controllers';
import { id, name, pincode, status } from './variables';

const routes = [
	{
		method: 'GET',
		path: '/broadcasts',
		config: {
			handler: broadcastCtrl.fetchAllBroadcasts,
			tags: ['api', 'broadcasts'],
			description: 'fetch all broadcasts',
		},
	},
	{
		method: 'POST',
		path: '/broadcasts',
		config: {
			handler: broadcastCtrl.createBroadcast,
			tags: ['api', 'broadcasts'],
			description: 'create new broadcast',
			validate: {
				payload: {
					name,
					pincode,
					status,
					lectureId: id,
				},
			},
		},
	},
	{
		method: 'PUT',
		path: '/broadcasts/{id}',
		config: {
			handler: broadcastCtrl.updateBroadcast,
			tags: ['api', 'broadcasts'],
			description: 'update broadcast by id',
			validate: {
				params: {
					id,
				},
				payload: {
					name,
					pincode,
					status,
					lectureId: id,
				},
			},
		},
	},
	{
		method: 'DELETE',
		path: '/broadcasts/{id}',
		config: {
			handler: broadcastCtrl.deleteBroadcast,
			tags: ['api', 'broadcasts'],
			description: 'delete broadcast by id',
			validate: {
				params: {
					id,
				},
			},
		},
	},
];

export default routes;
