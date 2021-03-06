const bcrypt = require('bcryptjs');
const _ = require('lodash');
const auth = require('../middleware/auth.js')
const {User,validate} = require('../models/user.js');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//create user
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.send(token);    
});

//get current user
router.get('/me', auth, async (req,res) => {
    const user = await User.findById(req.user._id);
    res.send(_.pick(user, ['_id','email']));
});

module.exports = router;