const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const tokenValid = require('../middleware/tokenValid');

// /api/projects/...

router.post('/', 
    tokenValid,
    projectController.addProject
);

module.exports = router;