const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


router.post('/add', async (req, res) => {
    try {
        await Task.create({ title: req.body.title });
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error saving task');
    }
});


router.get('/toggle/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            task.completed = !task.completed;
            await task.save();
        }
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error toggling task');
    }
});


router.get('/delete/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error deleting task');
    }
});

module.exports = router;
