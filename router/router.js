const express = require('express');
const router = express.Router();

const { authenticate } = require('../middlewares/authenticate.js')

const user = require('../controllers/user.js');
const event = require('../controllers/event.js');
const sponsor = require('../controllers/sponsor.js');
const student = require('../controllers/student.js');

router.get('/events', authenticate, event.getAll);
router.get('/sponsors', authenticate, sponsor.getAll);
router.get('/students', authenticate, student.getAll);
router.get('/student/profile', authenticate, student.getProfile)
router.get('/student/history', authenticate, student.getHistory);

router.post('/user/login', user.login);

module.exports = router;