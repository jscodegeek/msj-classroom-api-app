const Joi = require('joi');
const { broadcastsCtrl } = require('../controllers');

const name =Joi.string().max(200).trim().min(1).required();
const pincode =Joi.number().integer().min(1).required();
const status =Joi.string().max(20).trim().min(1).required();
const broadcastId = Joi.number().integer().min(1).required();

const routes = [
    {
        method: 'GET',
        path: '/broadcasts',
        handler: broadcastsCtrl.fetchAllBroadcasts
    },
    {
        method: 'POST',
        path: '/broadcasts',
        config: {
            handler: broadcastsCtrl.createBroadcast,
            validate: {
                payload: {
                    name,
                    pincode,
                    status
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/broadcasts/{broadcastId}',
        config: {
            handler: broadcastsCtrl.updateBroadcast,
            validate: {
                params: {
                    broadcastId
                },
                payload: {
                    name,
                    pincode,
                    status
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/broadcasts/{broadcastId}',
        config: {
            handler: broadcastsCtrl.deleteBroadcast,
            validate: {
                params: {
                    broadcastId
                }
            }
        }
     
    }
]

module.exports = routes;