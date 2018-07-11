const express = require('express');
const router = express.Router();

const { authenticate } = require('../middlewares/authenticate.js');
const storage = require('../middlewares/storage');

const user = require('../controllers/user.js');
const event = require('../controllers/event.js');
const sponsor = require('../controllers/sponsor.js');
const student = require('../controllers/student.js');

router.get('/events', authenticate, event.getAll);
router.get('/sponsors', authenticate, sponsor.getAll);
router.get('/students', authenticate, student.getAll);
router.get('/student/profile', authenticate, student.getProfile)
router.get('/student/history', authenticate, student.getHistory);
router.get('/sponsor/events', authenticate, sponsor.getEvents);
router.get('/sponsor/profile', authenticate, sponsor.getProfile);
router.get('/sponsors/download', authenticate, sponsor.downloadCsv);
router.get('/students/download', authenticate, student.downloadCsv);

router.post('/user/login', user.login);
router.post('/student/signup', storage.uploadStudentProfile, student.signup);
router.post('/event/create', authenticate, storage.uploadEventImage, event.createEvent);
router.post('/sponsor/create', authenticate, storage.uploadSponsorProfile, sponsor.createSponsor);

router.put('/student/apply', authenticate, student.applyEvent);
router.put('/student/profile', authenticate, storage.uploadStudentProfile, student.editProfile);
router.put('/event/detail', authenticate, storage.uploadEventImage, event.editEvent);

module.exports = router;