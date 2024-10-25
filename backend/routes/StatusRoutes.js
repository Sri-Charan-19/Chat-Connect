// routes/statusRoutes.js
const express = require('express');
const Status = require('../models/Status');
const router = express.Router();

// Get all statuses (filter out expired ones)
router.get('/', async (req, res) => {
  const now = new Date();
  const statuses = await Status.find({
    createdAt: { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) }, // Statuses from the last 24 hours
  }).populate('user');
  res.json(statuses);
});

// Add a new status
router.post('/', async (req, res) => {
  const { userId, text, photo } = req.body;
  const newStatus = new Status({
    user: userId,
    text,
    photo,
  });
  await newStatus.save();
  res.json(newStatus);
});

// Delete a status by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Status.findByIdAndDelete(id);
  res.json({ message: 'Status deleted' });
});

module.exports = router;
