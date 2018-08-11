const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const { isEmail, isDateString } = require('../utilities/validate.js');
const { Sponsor } = require('../models/sponsor.js');

const getAll = async (req, res) => {
  try {
    const sponsors = await Sponsor.getAll();
    res.send(sponsors);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Sponsor.getEvents(req.sender._id);
    res.send(events);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const getProfile = async (req, res) => {
  try {
    const sponsor = await Sponsor.getProfile(req.sender._id);
    res.send(sponsor);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
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

const createSponsor = async (req, res) => {
  const sponsor = req.body;
  
  try {
    if (!req.file) {
      throw new Error("logo is required");
    }
    if (req.sender.role !== 'root') {
      throw new Error("user isn't root");
    }
    if (!isEmail(sponsor.email)) {
      throw new Error("email is invalid");
    }
    if (!isDateString(sponsor.dateOfEstablished)) {
      throw new Error("date is invalid");
    }

    sponsor.role = "sponsor";
    sponsor.logo = req.file.path;

    const newSponsor = await Sponsor.createSponsor(sponsor);
    res.send(newSponsor);
  } catch (err) {
    res.status(400).send({message: err.message});
  }
};

const editProfile = async (req, res) => {
  const sponsor = req.body;
  sponsor.userId = req.sender._id;

  try {
    if (!req.body.logo && !req.file) {
      throw new Error("logo is required");
    }
    if (!req.body.logo) {
      sponsor.logo = req.file.path;
    }
    if (req.sender.role !== 'sponsor') {
      throw new Error("user isn't sponsor");
    }
    if (!isDateString(sponsor.dateOfEstablished)) {
      throw new Error("date is invalid");
    }

    const result = await Sponsor.editProfile(sponsor);
    if (!result.nModified) {
      throw new Error("can not update this event");
    }
    res.send({message: "updated"});
  } catch (err) {
    res.send({message: err.message});
  }
};

module.exports = {
  getAll,
  getEvents,
  getProfile,
  downloadCsv,
  createSponsor,
  editProfile
};