import { coursesCtrl } from '../controllers';
import { id, name, description, date, imageUrl } from './variables';

const routes = [
	{
		method: 'GET',
		path: '/courses',
		config: {
			handler: coursesCtrl.fetchAllCourses,
			tags: ['api', 'courses'],
			description: 'get all courses',
		},
	},
	{
		method: 'GET',
		path: '/courses/{id}',
		config: {
			handler: coursesCtrl.fetchCourseById,
			tags: ['api', 'courses'],
			description: 'get course by id',
			validate: {
				params: {
					id,
				},
			},
		},
	},
	{
		method: 'POST',
		path: '/courses',
		config: {
			handler: coursesCtrl.createCourse,
			tags: ['api', 'courses'],
			description: 'create new course',
			validate: {
				payload: {
					name,
					description,
					startDate: date,
					imageUrl,
				},
			},
		},
	},
	{
		method: 'PUT',
		path: '/courses/{id}',
		config: {
			handler: coursesCtrl.updateCourse,
			tags: ['api', 'courses'],
			description: 'update course by id',
			validate: {
				params: {
					id,
				},
				payload: {
					name,
					description,
					startDate: date,
					imageUrl,
				},
			},
		},
	},
	{
		method: 'DELETE',
		path: '/courses/{id}',
		config: {
			handler: coursesCtrl.deleteCourse,
			tags: ['api', 'courses'],
			description: 'delete course by id',
			validate: {
				params: {
					id,
				},
			},
		},
	},
];

export default routes;
