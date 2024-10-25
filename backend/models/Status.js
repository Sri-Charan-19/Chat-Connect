// models/Status.js
const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who posted the status
  },
  text: String,
  photo: String,
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current timestamp when the status is created
  },
});

module.exports = mongoose.model('Status', statusSchema);
