import * as Joi from 'joi';
import { userCtrl } from '../controllers';
import { USER_SCOPES } from '../shared/variables';
import { id, firstname, lastname, login, password, subscribable, authToken } from './variables';

const routes = [
	{
		method: 'GET',
		path: '/users',
		config: {
			handler: userCtrl.fetchAllUsers,
			tags: ['api', 'users'],
			description: 'fetch all users',
		},
	},
	{
		method: 'GET',
		path: '/users/{id}',
		config: {
			handler: userCtrl.fetchUserById,
			tags: ['api', 'users'],
			description: 'fetch user by id',
			validate: {
				params: {
					id,
				},
			},
		},
	},
	{
		method: 'PUT',
		path: '/users/{id}',
		config: {
			handler: userCtrl.updateUser,
			tags: ['api', 'users'],
			description: 'update user by id',
			validate: {
				params: {
					id,
				},
				payload: {
					firstname,
					lastname,
					login,
					password,
				},
			},
		},
	},
	{
		method: 'DELETE',
		path: '/users/{id}',
		config: {
			handler: userCtrl.deleteUser,
			tags: ['api', 'users'],
			description: 'delete user by id',
			validate: {
				params: {
					id,
				},
			},
		},
	},
	{
		method: 'POST',
		path: '/users/subscribe',
		config: {
			handler: userCtrl.subscribe,
			tags: ['api', 'users'],
			description: 'subscribe user to course or lecture',
			auth: {
				strategy: 'jwt',
				scope: [USER_SCOPES.STUDENT, USER_SCOPES.ADMIN],
			},
			validate: {
				headers: Joi.object({
					authorization: authToken.required(),
				}).options({ allowUnknown: true }),
				payload: {
					entity: subscribable,
					id,
				},
			},
		},
	},
	{
		method: 'POST',
		path: '/users/unsubscribe',
		config: {
			handler: userCtrl.unsubscribe,
			tags: ['api', 'users'],
			description: 'unsubscribe user from course or lecture',
			auth: {
				strategy: 'jwt',
				scope: [USER_SCOPES.STUDENT, USER_SCOPES.ADMIN],
			},
			validate: {
				headers: Joi.object({
					authorization: authToken.required(),
				}).options({ allowUnknown: true }),
				payload: {
					entity: subscribable,
					id,
				},
			},
		},
	},
];

export default routes;
