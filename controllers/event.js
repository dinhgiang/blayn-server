const { Event } = require('../models/event.js');

const getAll = async (req, res) => {
  const events = await Event.getAll();
  res.send(events);
};

module.exports = {
  getAll
};