import { broadcastsCtrl } from '../controllers';
import { id, name, pincode, status } from './variables';

const routes = [
	{
		method: 'GET',
		path: '/broadcasts',
		config: {
			handler: broadcastsCtrl.fetchAllBroadcasts,
			tags: ['api', 'broadcasts'],
			description: 'get all broadcasts',
		},
	},
	{
		method: 'POST',
		path: '/broadcasts',
		config: {
			handler: broadcastsCtrl.createBroadcast,
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
			handler: broadcastsCtrl.updateBroadcast,
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
			handler: broadcastsCtrl.deleteBroadcast,
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
