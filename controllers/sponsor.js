const { Sponsor } = require('../models/sponsor.js');

const getAllSponsors = async function(req, res) {
  let sponsors = await Sponsor.getAllSponsors();
  res.send(sponsors);
};

module.exports = {
  getAllSponsors
}