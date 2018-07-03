const express = require('express');
const router = express.Router();

const { authenticate } = require('../middlewares/authenticate.js')

const user = require('../controllers/user.js');
const event = require('../controllers/event.js');
const sponsor = require('../controllers/sponsor.js');
const student = require('../controllers/student.js');

router.get('/events', authenticate, event.getAllEvents);
router.get('/sponsors', authenticate, sponsor.getAllSponsors);
router.get('/students', authenticate, student.getAllStudents);

router.post('/user/login', user.login);

module.exports = router;