import * as Joi from 'joi';
import { lecturesCtrl } from '../controllers';

const title = Joi.string()
	.max(200)
	.trim()
	.min(1)
	.required();
const description = Joi.string()
	.max(10000)
	.min(1)
	.required();
const scheduledTime = Joi.date().required();
const id = Joi.number()
	.integer()
	.min(1)
	.required();

const routes = [
	{
		method: 'GET',
		path: '/lectures',
		config: {
			handler: lecturesCtrl.fetchAllLectures,
			tags: ['api', 'lectures'],
			description: 'get all lectures',
		},
	},
	{
		method: 'GET',
		path: '/lectures/{id}',
		config: {
			handler: lecturesCtrl.fetchLectureById,
			tags: ['api', 'lectures'],
			description: 'get lecture by id',
			validate: {
				params: {
					id,
				},
			},
		},
	},
	{
		method: 'POST',
		path: '/lectures',
		config: {
			handler: lecturesCtrl.createLecture,
			tags: ['api', 'lectures'],
			description: 'create new lecture',
			validate: {
				payload: {
					title,
					description,
					scheduledTime,
				},
			},
		},
	},
	{
		method: 'PUT',
		path: '/lectures/{id}',
		config: {
			handler: lecturesCtrl.updateLecture,
			tags: ['api', 'lectures'],
			description: 'update lecture by id',
			validate: {
				params: {
					id,
				},
				payload: {
					title,
					description,
					scheduledTime,
				},
			},
		},
	},
	{
		method: 'DELETE',
		path: '/lectures/{id}',
		config: {
			handler: lecturesCtrl.deleteLecture,
			tags: ['api', 'lectures'],
			description: 'delete lecture by id',
			validate: {
				params: {
					id,
				},
			},
		},
	},
];

export default routes;
