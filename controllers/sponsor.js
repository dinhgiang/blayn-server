const { Sponsor } = require('../models/sponsor.js');

const getAll = async (req, res) => {
  const sponsors = await Sponsor.getAll();
  res.send(sponsors);
};

module.exports = {
  getAll
}