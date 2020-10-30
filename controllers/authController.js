const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.registration = async (req, res) => {
    const response = validationResult(req);
    if( !response.isEmpty() ) {
        return res.status(400).json({msg: response.errors[0].msg })
    }

    const { email, password } = req.body;

    try {
        let userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ msg: 'This email has already been registered' });
        }

        const newUser = new User(req.body);

        const salt = await bcryptjs.genSalt(10);
        newUser.password = await bcryptjs.hash(password, salt);

        await newUser.save();

        const payload = {
            userId: newUser._id
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 60 * 60 * 24 * 31       // in seconds
        }, (error, token) => {
            if (error) throw error;

            res.json({ token, newUser });
        });
    
    } catch (error) {
        console.log(error);
        res.status(400).send('Registration failed! Something went wrong...');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'No user with that email found!' });
        }

        const passwordMatches = await bcryptjs.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(400).json({ msg: 'Wrong password. Try again!' });
        }

        const payload = {
            userId: user._id
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 60 * 60 * 24 * 31     // in seconds
        }, (error, token) => {
            if (error) throw error;

            res.json({ token, user });
        });

    } catch (error) {
        console.log(error);
    }
};

exports.userInfo = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error caught' });
    }
};