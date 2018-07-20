const moment = require('moment');

const { Event } = require('../models/event.js');
const { Sponsor } = require('../models/sponsor.js');
const { Student } = require('../models/student.js');
const { isDateString, isTimeString, isTimeBeforeNow } = require('../utilities/validate.js') 

const MAX_EVENT_TIME = 120; //minutes

const getAll = async (req, res) => {
  try {
    let events;
    if (req.sender.role === 'student') {
      const student = await Student.getProfile(req.sender._id);
      events = await Event.getAllForStudent();
      
      // check student applied event
      events.forEach(event => {
        event._doc.applied = false;
        event.followingStudents.forEach(element => {
          if (element.studentId.toString() === student._id.toString()) {
            event._doc.applied = true;
          }
        });
      });
    }
    if (req.sender.role === 'root') {
      events = await Event.getAllForRoot();
    }
    if (req.sender.role === 'sponsor') {
      events = await Event.getAllForSponsor();
    }
    res.send(events);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
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
    if (!result.nModified) {
      throw new Error("can not update this event")
    }
    res.send({message: "updated"});
  } catch (err) {
    res.status(400).send({message: err.message});
  }  
};

const approve = async (req, res) => {
  const event = {
    eventId: req.body.eventId
  };

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
    
    if (!result.nModified) {
      if (req.body.approve) {
        throw new Error("can't approve this event");
      } else {
        throw new Error("can't deny this event");
      }
    };

    res.send({message: event.status});
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const removeEvent = async (req, res) => {
  try {
    if (req.sender.role !== "root" && req.sender.role !== "sponsor") {
      throw new Error("you can not delete event");
    }

    let result;
    
    if (req.sender.role === "root") {
      result = await Event.removeEventForRoot(req.body.eventId);
    }

    if (req.sender.role === "sponsor") {
      result = await Event.removeEventForSponsor(req.body.eventId, req.sender._id);
    }

    if (!result.n) {
      throw new Error("can not delete this event");  
    }

    res.send({message: "delete success"});
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