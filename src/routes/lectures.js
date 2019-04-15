const Joi = require('joi');
const { lecturesCtrl } = require('../controllers');

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
    handler: lecturesCtrl.fetchAllLectures,
  },
  {
    method: 'GET',
    path: '/lectures/{id}',
    config: {
      handler: lecturesCtrl.fetchLectureById,
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
      validate: {
        params: {
          id,
        },
      },
    },
  },
];

module.exports = routes;
