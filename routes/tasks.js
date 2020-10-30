const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const tokenValid = require('../middleware/tokenValid');

// /api/tasks/...

router.post('/', 
    tokenValid,
    taskController.addTask
);

router.get('/:id', 
    tokenValid,
    taskController.synchronizeTasks
);

router.patch('/:id', 
    tokenValid,
    taskController.updateNameOrStatus
);

router.delete('/:id', 
    tokenValid,
    taskController.deleteTask
);

module.exports = router;