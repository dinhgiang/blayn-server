const { Sponsor } = require('../models/sponsor.js');

const getAll = async (req, res) => {
  const sponsors = await Sponsor.getAll();
  res.send(sponsors);
};

const getEvents = async (req, res) => {
  const events = await Sponsor.getEvents(req.sender._id);
  res.send(events);
};

const getProfile = async (req, res) => {
  const sponsor = await Sponsor.getProfile(req.sender._id);
  res.send(sponsor);
};

module.exports = {
  getAll,
  getEvents,
  getProfile
};