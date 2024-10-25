// // routes/messageRoutes.js
// const express = require('express');
// const router = express.Router();
// const Message = require('../models/Message');

// // @route   GET /messages/:user1/:user2
// // @desc    Fetch messages between two users
// router.get('/:user1/:user2', async (req, res) => {
//   const { user1, user2 } = req.params;

//   try {
//     // Fetch messages where sender is user1 and receiver is user2 or vice versa
//     const messages = await Message.find({
//       $or: [
//         { senderID: user1, receiverID: user2 },
//         { senderID: user2, receiverID: user1 },
//       ],
//     });
//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // @route   POST /messages
// // @desc    Create a new message
// router.post('/', async (req, res) => {
//   const { senderID, receiverID, text, addedOn } = req.body;

//   try {
//     const newMessage = new Message({
//       senderID,
//       receiverID,
//       text,
//       addedOn,
//     });

//     const savedMessage = await newMessage.save();
//     res.status(201).json(savedMessage);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });




// router.put('/delete-for-me/:messageId/:userId', async (req, res) => {
//   try {
//     const { messageId, userId } = req.params;

//     // Mark the message as deleted for the specific user
//     const message = await Message.findByIdAndUpdate(
//       messageId,
//       { $addToSet: { deletedFor: userId } }, // Add the user ID to the deletedFor array
//       { new: true }
//     );

//     if (!message) {
//       return res.status(404).send('Message not found');
//     }

//     res.status(200).send(message);
//   } catch (error) {
//     console.error('Error deleting message for me:', error);
//     res.status(500).send('Server error');
//   }
// });

// // Delete message for both sender and receiver (Delete for Everyone)
// router.delete('/:id', async (req, res) => {
//   try {
//     const messageId = req.params.id;

//     const message = await Message.findByIdAndDelete(messageId);

//     if (!message) {
//       return res.status(404).send('Message not found');
//     }

//     res.status(200).send({ success: true, message: 'Message deleted for everyone' });
//   } catch (error) {
//     console.error('Error deleting message:', error);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;





const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Fetch messages between two users
router.get('/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    // Fetch messages that are not deleted for the logged-in user
    const messages = await Message.find({
      $or: [
        { senderID: user1, receiverID: user2 },
        { senderID: user2, receiverID: user1 },
      ],
      deletedFor: { $ne: user1 }, // Exclude messages deleted for user1
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new message
router.post('/', async (req, res) => {
  const { senderID, receiverID, text, addedOn } = req.body;

  try {
    const newMessage = new Message({
      senderID,
      receiverID,
      text,
      addedOn,
      deletedFor: [] // Initially, no users have deleted the message
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// "Delete for Me" - Mark the message as deleted for the specific user
router.put('/delete-for-me/:messageId/:userId', async (req, res) => {
  try {
    const { messageId, userId } = req.params;

    // Add the user ID to the deletedFor array
    const message = await Message.findByIdAndUpdate(
      messageId,
      { $addToSet: { deletedFor: userId } }, // Ensure userId is added only once
      { new: true }
    );

    if (!message) {
      return res.status(404).send('Message not found');
    }

    res.status(200).send(message);
  } catch (error) {
    console.error('Error deleting message for me:', error);
    res.status(500).send('Server error');
  }
});

// "Delete for Everyone" - Delete the message permanently for both users
router.delete('/:id', async (req, res) => {
  try {
    const messageId = req.params.id;

    const message = await Message.findByIdAndDelete(messageId);

    if (!message) {
      return res.status(404).send('Message not found');
    }

    res.status(200).send({ success: true, message: 'Message deleted for everyone' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
