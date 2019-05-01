import * as Joi from 'joi';
import { lectureCtrl } from '../controllers';
import { id, name, date, description, authToken } from './variables';

const routes = [
	{
		method: 'GET',
		path: '/lectures',
		config: {
			handler: lectureCtrl.fetchAllLectures,
			tags: ['api', 'lectures'],
			description: 'fetch all lectures',
		},
	},
	{
		method: 'GET',
		path: '/lectures/{id}',
		config: {
			handler: lectureCtrl.fetchLectureById,
			tags: ['api', 'lectures'],
			description: 'fetch lecture by id',
			validate: {
				headers: Joi.object({
					authorization: authToken.optional(),
				}).options({ allowUnknown: true }),
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
			handler: lectureCtrl.createLecture,
			tags: ['api', 'lectures'],
			description: 'create new lecture',
			validate: {
				payload: {
					title: name,
					description,
					scheduledTime: date,
					courseId: id,
				},
			},
		},
	},
	{
		method: 'PUT',
		path: '/lectures/{id}',
		config: {
			handler: lectureCtrl.updateLecture,
			tags: ['api', 'lectures'],
			description: 'update lecture by id',
			validate: {
				params: {
					id,
				},
				payload: {
					title: name,
					description,
					scheduledTime: date,
					courseId: id,
				},
			},
		},
	},
	{
		method: 'DELETE',
		path: '/lectures/{id}',
		config: {
			handler: lectureCtrl.deleteLecture,
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
