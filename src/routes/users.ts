import * as Joi from 'joi';
import { usersCtrl } from '../controllers';

const firstname = Joi.string()
	.max(200)
	.trim()
	.min(1)
	.required();
const lastname = Joi.string()
	.max(200)
	.trim()
	.min(1)
	.required();
const login = Joi.string()
	.max(200)
	.trim()
	.min(1)
	.required();
const password = Joi.string()
	.max(200)
	.trim()
	.min(1)
	.required();
const id = Joi.number()
	.integer()
	.min(1)
	.required();
const authToken = Joi.string()
	.max(2000)
	.trim()
	.min(1)
	.required();

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
];

export default routes;
