const { Sponsor } = require('../models/sponsor.js');
const { Event } = require('../models/event.js');

const getAll = async (req, res) => {
  const sponsors = await Sponsor.getAll();
  res.send(sponsors);
};

const getEvents = async (req, res) => {
  const events = await Event.getEventsForSponsor(req.sender._id);
  res.send(events);
};

module.exports = {
  getAll,
  getEvents
}