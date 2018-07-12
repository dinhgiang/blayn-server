const moment = require('moment');

const { Event } = require('../models/event.js');
const { Sponsor } = require('../models/sponsor.js');
const { isDateString, isTimeString, isTimeBeforeNow } = require('../utilities/validate.js') 

const MAX_EVENT_TIME = 120; //minutes

const getAll = async (req, res) => {
  let events;
  if (req.sender.role === 'student') {
    events = await Event.getAllForStudent();
  }
  if (req.sender.role === 'root') {
    events = await Event.getAllForRoot();
  }
  if (req.sender.role === 'sponsor') {
    events = await Event.getAllForSponsor();
  }
  res.send(events);
};

const createEvent = async (req, res) => {
  const event = req.body;
  
  if (event.schedule = 'true') {
    event.status = 'under review'
  } else {
    event.status = 'draft';
  }
  
  try {
    if (!req.file) {
      throw new Error("image is required");
    }
    if (req.sender.role !== 'sponsor') {
      throw new Error("user isn't sponsor");
    }
    if (!isDateString(event.date)) {
      throw new Error("date is invalid");
    }
    if (!isTimeString(event.startingTime)) {
      throw new Error("time is invalid");
    }
    if (isTimeBeforeNow(event.date + ' ' + event.startingTime)) {
      throw new Error("wrong time");
    }
    
    event.image = req.file.path;
    event.endingTime = moment(event.startingTime, 'HH:mm:ss', false).add(MAX_EVENT_TIME, 'm').format('HH:mm:ss');
    event.sponsorId = req.sender._id;
    const newEvent = await Event.createEvent(event);
    
    res.send(newEvent);
  } catch (err) {
    return res.status(400).send({message: err.message});
  }
};

const editEvent = async (req, res) => {
  const event = req.body;
  const sponsor = await Sponsor.getByUserId(req.sender._id);
  event.sponsorId = sponsor._id;

  try {
    if (!req.file && !req.body.image) {
      throw new Error("image is required");
    }
    if (!req.body.image) {
      event.image = req.file.path;
    }
    if (req.body.schedule) {
      event.status = "under review";
    } else {
      event.status = "draft";
    }

    if (req.sender.role !== 'sponsor') {
      throw new Error("user isn't sponsor");
    }
    if (!isDateString(event.date)) {
      throw new Error("date is invalid");
    }
    if (!isTimeString(event.startingTime)) {
      throw new Error("time is invalid");
    }
    if (isTimeBeforeNow(event.date + ' ' + event.startingTime)) {
      throw new Error("wrong time");
    }

    const result = await Event.editEvent(event);
    res.send(result);
  } catch (err) {
    
    res.status(400).send({message: err.message});
  }  
};

const approve = async (req, res) => {
  const event = new Object();
  event.eventId = req.body.eventId;

  try {
    if (req.sender.role !== "root") {
      throw new Error("user isn't root");
    }
    if (req.body.approve) {
      event.status = "approved";
    } else {
      event.status = "denied";
    }

    const result = await Event.approve(event);
    
    if (!result.n) {
      throw new Error("can not find this event");
    };
    res.send(result);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const removeEvent = async (req, res) => {
  try {
    if (req.sender.role !== "root") {
      throw new Error("user isn't root")
    }

    const result = await Event.removeEvent(req.body.eventId);

    if (result.n == 0) {
      throw new Error("can not find this event");  
    }

    res.send("delete success");
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

module.exports = {
  getAll,
  createEvent,
  editEvent,
  approve,
  removeEvent
};