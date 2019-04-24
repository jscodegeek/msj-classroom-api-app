import * as Joi from 'joi';
import { coursesCtrl } from '../controllers';

const name = Joi.string()
	.max(200)
	.trim()
	.min(1)
	.required();
const description = Joi.string()
	.max(10000)
	.min(1)
	.required();
const startDate = Joi.date().required();
const imageUrl = Joi.string()
	.max(10000)
	.min(1)
	.required();
const id = Joi.number()
	.integer()
	.min(1)
	.required();

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
					startDate,
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
					startDate,
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
