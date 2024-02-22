const express = require('express');
const router = express.Router();
const controllers = require('../controllers/eventsController');

// get all events
router.get('/', controllers.getAllEvents);

// get events by userId
router.get('/userEvents/:id', controllers.getUserEvents);

// get events by companyId
router.get('/companyEvents/:id', controllers.getCompanyEvents);

// create events
router.post('/', controllers.addEvents);

// edit events
router.put('/:id', controllers.editEvents);

// get events by id
router.get('/:id', controllers.getEventsById);

// delete events
router.delete('/:id', controllers.deleteEvents);


module.exports = router;