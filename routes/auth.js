const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const tokenValid = require('../middleware/tokenValid');

// api/auth/...

router.post('/registration', 
    authController.registration
);

router.post('/login',
    authController.login
)

router.get('/user-info',
    tokenValid,
    authController.userInfo
)

module.exports = router;