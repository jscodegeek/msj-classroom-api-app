const { Broadcast } = require('./../models');

const fetchAllBroadcasts = async (request, h) => {
  const broadcasts = await Broadcast.findAll();

  return h.response(broadcasts);
}

const broadcastsCtrl = {
  fetchAllBroadcasts
}

module.exports = broadcastsCtrl;
