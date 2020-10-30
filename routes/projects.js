const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const tokenValid = require('../middleware/tokenValid');

// /api/projects/...

router.post('/', 
    tokenValid,
    projectController.addProject
);

router.get('/', 
    tokenValid,
    projectController.synchronizeProjects
);

router.delete('/:id',
    tokenValid,
    projectController.deleteProject
)

module.exports = router;