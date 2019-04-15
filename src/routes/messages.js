const Joi = require('joi');
const { messagesCtrl } = require('../controllers');

const author = Joi.string()
  .max(100)
  .trim()
  .min(1)
  .required();
const text = Joi.string()
  .max(10000)
  .min(1)
  .required();
const type = Joi.string()
  .max(20)
  .trim()
  .min(1)
  .required();
const broadcastId = Joi.number()
  .integer()
  .min(1)
  .required();

const routes = [{
  method: 'GET',
  path: '/messages',
  handler: messagesCtrl.fetchAllMessages,
},
{
  method: 'POST',
  path: '/messages',
  config: {
    handler: messagesCtrl.createMessage,
    validate: {
      payload: {
        author,
        text,
        type,
        broadcastId,
      },
    },
  },
}];

module.exports = routes;
