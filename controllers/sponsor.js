const { Sponsor } = require('../models/sponsor.js');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

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

const downloadCsv = async (req, res) => {
  try {
    const csvPath = './public/file.csv';

    // fetch sponsors data
    const sponsors = await Sponsor.getAll();

    // delete file if exist
    if (fs.existsSync(csvPath)) {
      fs.unlinkSync(csvPath);
    }
    
    // generate new csv file
    const csvWriter = createCsvWriter({
      path: csvPath,
      header: [
          {id: 'department', title: 'department'},
          {id: 'position', title: 'position'},
          {id: 'introduction1', title: 'introduction1'},
          {id: 'introduction2', title: 'introduction2'},
          {id: 'dateOfEstablished', title: 'Ngay thanh lap'},
      ]
    });

    await csvWriter.writeRecords(sponsors);

    // send file to client
    res.sendFile(path.join(__dirname, '..', csvPath));
  } catch (e) {
    res.status(404).send({
      message: 'File not found'
    });
  }
}

module.exports = {
  getAll,
  getEvents,
  getProfile,
  downloadCsv
};