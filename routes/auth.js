const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const tokenValid = require('../middleware/tokenValid');
const { body } = require('express-validator');


// api/auth/...

router.post('/registration',
    [
        body('name', 'Please choose a name!').not().isEmpty(),
        body('email', 'Please add a valid email!').isEmail(),
        body('password', 'The password has to be at least 6 characters long!').isLength({ min: 6 })
    ],
    authController.registration
);

router.post('/login',
    authController.login
);

router.get('/user-info',
    tokenValid,
    authController.userInfo
);

module.exports = router;