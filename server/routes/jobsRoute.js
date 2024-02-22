const express = require('express');
const router = express.Router();
const controllers = require('../controllers/jobsController');

// get all jobs
router.get('/', controllers.getAllJobs);

// get jobs by userId
router.get('/userJobs/:id', controllers.getUserJobs);

// create jobs
router.post('/', controllers.addJobs);

// edit jobs
router.put('/update/:id', controllers.editJobs);

// get jobs by id
router.get('/:id', controllers.getJobsById);

// delete jobs
router.delete('/:id', controllers.deleteJobs);


module.exports = router;