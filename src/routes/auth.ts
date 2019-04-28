import { authCtrl } from '../controllers';
import { firstname, lastname, login, password, authToken } from './variables';

const routes = [
	{
		method: 'POST',
		path: '/users',
		config: {
			handler: authCtrl.signUp,
			tags: ['api', 'auth'],
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
			handler: authCtrl.signIn,
			tags: ['api', 'auth'],
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
			handler: authCtrl.validateToken,
			tags: ['api', 'auth'],
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
