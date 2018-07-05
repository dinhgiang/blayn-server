const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

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

const downloadCsv = async (req, res) => {
  try {
    const csvPath = './public/csv/sponsors.csv';

    const sponsors = await Sponsor.getAll();

    if (fs.existsSync(csvPath)) {
      fs.unlinkSync(csvPath);
    }
    
    const csvWriter = createCsvWriter({
      path: csvPath,
      header: [
          { id: 'companyname', title: 'Company name' },
          { id: 'staffName', title: 'Staff name' },
          { id: 'staffRubyName', title: 'Ruby of staff name' },
          { id: 'companyAddress', title: 'Company address' },
          { id: 'companyPhone', title: 'Company phone' },
          { id: 'department', title: 'Department' },
          { id: 'position', title: 'Position' },
          { id: 'CEOName', title: 'CEO name' },
          { id: 'dateOfEstablished', title: 'Date of established' },
          { id: 'numberOfEmployees', title: 'Number of employees' },
          { id: 'industry', title: 'Industry' },
          { id: 'websiteURL', title: 'Website' },
          { id: 'introduction1', title: 'Introduction 1' },
          { id: 'introduction2', title: 'Introduction 2' }
      ]
    });

    await csvWriter.writeRecords(sponsors);

    res.sendFile(path.join(__dirname, '..', csvPath));
  } catch (e) {
    res.status(404).send({
      message: 'File not found'
    });
  }
};

module.exports = {
  getAll,
  getEvents,
  getProfile,
  downloadCsv
};