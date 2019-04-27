import { usersCtrl } from '../controllers';
import { id, firstname, lastname, login, password, subscribable, authToken } from './variables';

const routes = [
	{
		method: 'GET',
		path: '/users',
		config: {
			handler: usersCtrl.fetchAllUsers,
			tags: ['api', 'users'],
			description: 'get all users',
		},
	},
	{
		method: 'GET',
		path: '/users/{id}',
		config: {
			handler: usersCtrl.fetchUserById,
			tags: ['api', 'users'],
			description: 'get user by id',
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
			handler: usersCtrl.updateUser,
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
			handler: usersCtrl.deleteUser,
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
		path: '/users',
		config: {
			handler: usersCtrl.signUp,
			tags: ['api', 'users'],
			description: 'sign up',
			validate: {
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
		method: 'POST',
		path: '/login',
		config: {
			handler: usersCtrl.signIn,
			tags: ['api', 'users'],
			description: 'sign in',
			validate: {
				payload: {
					login,
					password,
				},
			},
		},
	},
	{
		method: 'POST',
		path: '/validateToken',
		config: {
			handler: usersCtrl.validateToken,
			tags: ['api', 'users'],
			description: 'validate token',
			validate: {
				payload: {
					authToken,
				},
			},
		},
	},
	{
		method: 'POST',
		path: '/users/{userId}/subscribe',
		config: {
			handler: usersCtrl.subscribe,
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
			handler: usersCtrl.unsubscribe,
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
