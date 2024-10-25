// // models/Message.js
// const mongoose = require('mongoose');

// // Define message schema
// const messageSchema = new mongoose.Schema({
//   senderID: { type: String, required: true },
//   receiverID: { type: String, required: true },
//   text: { type: String, required: true },
//   addedOn: { type: String, required: true },
// });

// // Create message model
// const Message = mongoose.model('Message', messageSchema);

// module.exports = Message;




const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderID: { type: String, required: true },
  receiverID: { type: String, required: true },
  text: { type: String, required: true },
  addedOn: { type: String },
  deletedFor: [{ type: String }] // Tracks users who deleted the message for themselves
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;