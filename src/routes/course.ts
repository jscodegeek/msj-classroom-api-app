import { courseCtrl } from '../controllers';
import { id, name, description, date, imageUrl } from './variables';

const routes = [
	{
		method: 'GET',
		path: '/courses',
		config: {
			handler: courseCtrl.fetchAllCourses,
			tags: ['api', 'courses'],
			description: 'fetch all courses',
		},
	},
	{
		method: 'GET',
		path: '/courses/{id}',
		config: {
			handler: courseCtrl.fetchCourseById,
			tags: ['api', 'courses'],
			description: 'fetch course by id',
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
			handler: courseCtrl.createCourse,
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
			handler: courseCtrl.updateCourse,
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
			handler: courseCtrl.deleteCourse,
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
