import * as Joi from 'joi';
import { meCtrl } from '../controllers';
import { USER_SCOPES } from '../shared/variables';
import { firstname, lastname, login, password, authToken } from './variables';

const routes = [
	{
		method: 'GET',
		path: '/me',
		config: {
			handler: meCtrl.fetchMe,
			tags: ['api', 'me'],
			description: 'fetch me',
			auth: {
				strategy: 'jwt',
				scope: [USER_SCOPES.STUDENT, USER_SCOPES.ADMIN],
			},
			validate: {
				headers: Joi.object({
					authorization: authToken.required(),
				}).options({ allowUnknown: true }),
			},
		},
	},
	{
		method: 'PUT',
		path: '/me',
		config: {
			handler: meCtrl.updateMe,
			tags: ['api', 'me'],
			description: 'update me',
			auth: {
				strategy: 'jwt',
				scope: [USER_SCOPES.STUDENT, USER_SCOPES.ADMIN],
			},
			validate: {
				headers: Joi.object({
					authorization: authToken.required(),
				}).options({ allowUnknown: true }),
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
		method: 'GET',
		path: '/me/courses',
		config: {
			handler: meCtrl.fetchMyCourses,
			tags: ['api', 'me'],
			description: 'fetch my courses',
			auth: {
				strategy: 'jwt',
				scope: [USER_SCOPES.STUDENT, USER_SCOPES.ADMIN],
			},
			validate: {
				headers: Joi.object({
					authorization: authToken.required(),
				}).options({ allowUnknown: true }),
			},
		},
	},
	{
		method: 'GET',
		path: '/me/lectures',
		config: {
			handler: meCtrl.fetchMyLectures,
			tags: ['api', 'me'],
			description: 'fetch my lectures',
			auth: {
				strategy: 'jwt',
				scope: [USER_SCOPES.STUDENT, USER_SCOPES.ADMIN],
			},
			validate: {
				headers: Joi.object({
					authorization: authToken.required(),
				}).options({ allowUnknown: true }),
			},
		},
	},
];

export default routes;
