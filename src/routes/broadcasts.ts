import * as Joi from 'joi';
import { broadcastsCtrl } from '../controllers';

const name = Joi.string()
	.max(200)
	.trim()
	.min(1)
	.required();
const pincode = Joi.number()
	.integer()
	.min(1)
	.required();
const status = Joi.string()
	.max(20)
	.trim()
	.min(1)
	.required();
const id = Joi.number()
	.integer()
	.min(1)
	.required();
const lectureId = Joi.number()
	.integer()
	.min(1)
	.required();

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
					lectureId,
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
					lectureId,
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
