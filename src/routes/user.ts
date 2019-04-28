import { userCtrl } from '../controllers';
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
		path: '/users/{userId}/subscribe',
		config: {
			handler: userCtrl.subscribe,
			tags: ['api', 'users'],
			description: 'subscribe user to course or lecture',
			validate: {
				params: {
					userId: id,
				},
				payload: {
					entity: subscribable,
					id,
				},
			},
		},
	},
	{
		method: 'POST',
		path: '/users/{userId}/unsubscribe',
		config: {
			handler: userCtrl.unsubscribe,
			tags: ['api', 'users'],
			description: 'unsubscribe user from course or lecture',
			validate: {
				params: {
					userId: id,
				},
				payload: {
					entity: subscribable,
					id,
				},
			},
		},
	},
];

export default routes;
