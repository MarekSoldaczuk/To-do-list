const mongoose = require('mongoose');
const {List, validate} = require('../models/list.js');

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // console.log(req.body);
  
    // let list = new List({ name: req.body.name, userId: req.body.id });
    let list = new List({ });
    list.name = req.body.name;
    list.userId = req.user._id; 
    list.items = req.body.items;
    list = await list.save();
  
    res.send(list);
});

router.get('/', async (req, res) => {
    const lists = await List.find({ userId: req.user._id });
    
    res.send(lists);
});

//np. GET http://localhost:3000/api/lists/5df4edb327459638cb5514ba
router.get('/:id', async (req, res) => {
    const list = await List.findById(req.params.id);
    
    // checking whether it is a user's list
    if (list.userId !== req.user._id) return res.status(404).send('The list with the given user ID was not found.');
    res.send(list);    
});

router.delete('/:id', async (req, res) => {
    const list = await List.findByIdAndRemove(req.params.id);
    
    // checking whether it is a user's list
    if (list.userId !== req.user._id) return res.status(404).send('The list with the given ID was not found.');
    res.send(list);
});

router.put('/:id', async (req, res) => {
    let list = await List.findById(req.params.id);

    // checking whether it is a user's list
    if (list.userId !== req.user._id) res.status(404).send('The list with the given ID was not found');
    const { error } = validate(req.body); 
    
    if (error) return res.status(400).send(error.details[0].message);

    list.name = req.body.name;
    list.items = req.body.items;
    try {
        list = await list.save();
    }
    catch(e) {
        res.status(404).send('The list with the given ID was not found');
    }
    res.send(list);
});

module.exports = router;