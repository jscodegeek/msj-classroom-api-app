const { broadcastsCtrl } = require('./../controllers');

const routes = [
    {
        method: 'GET',
        path: '/broadcasts',
        handler: broadcastsCtrl.fetchAllBroadcasts
    }
]

module.exports = routes;