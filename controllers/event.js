const { Event } = require('../models/event.js');

const getAllEvents = async function (req, res) {
  const events = await Event.getAllEvents();
  res.send(events);
};

module.exports = {
  getAllEvents
};