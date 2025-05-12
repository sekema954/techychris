const express = require('express');
const router = express.Router();
const subscription = require('../../models/user/subscription');


// Get all subscriber emails
router.get('/get/emails', async (req, res) => {
    try {
      const subscribers = await subscription.find({}, 'email createdAt');
      res.status(200).json({ subscribers });
    } catch (err) {
      console.error('Error fetching subscribers', err);
      res.status(500).json({ message: 'Internal server error while fetching subscribers' });
    }
  });

  module.exports = router