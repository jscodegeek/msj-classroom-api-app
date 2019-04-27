import { lecturesCtrl } from '../controllers';
import { id, name, date, description } from './variables';

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
			handler: lecturesCtrl.updateLecture,
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
