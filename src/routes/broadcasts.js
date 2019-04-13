const Joi = require('joi');
const { broadcastsCtrl } = require('../controllers');

const name = Joi.string().max(200).trim().min(1).required();
const pincode = Joi.number().integer().min(1).required();
const status = Joi.string().max(20).trim().min(1).required();
const id = Joi.number().integer().min(1).required();
const lectureId = Joi.number().integer().min(1).required();

const routes = [
	{
		method: 'GET',
		path: '/broadcasts',
		handler: broadcastsCtrl.fetchAllBroadcasts
	},
	{
		method: 'POST',
		path: '/broadcasts',
		config: {
			handler: broadcastsCtrl.createBroadcast,
			validate: {
				payload: {
					name,
					pincode,
					status,
					lectureId
				}
			}
		}
	},
	{
		method: 'PUT',
		path: '/broadcasts/{id}',
		config: {
			handler: broadcastsCtrl.updateBroadcast,
			validate: {
				params: {
					id
				},
				payload: {
					name,
					pincode,
					status,
					lectureId
				}
			}
		}
	},
	{
		method: 'DELETE',
		path: '/broadcasts/{id}',
		config: {
			handler: broadcastsCtrl.deleteBroadcast,
			validate: {
				params: {
					id
				}
			}
		}	
	}
]

module.exports = routes;