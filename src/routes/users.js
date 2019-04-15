const Joi = require('joi');
const { usersCtrl } = require('../controllers');

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
    handler: usersCtrl.fetchAllUsers,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    config: {
      handler: usersCtrl.fetchUserById,
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
      validate: {
        payload: {
          authToken,
        },
      },
    },
  },
];

module.exports = routes;
