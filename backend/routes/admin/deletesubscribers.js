const express = require('express');
const subscription = require('../../models/user/subscription');
const router = express.Router();

// DELETE a subscriber by ID
router.delete('/delete/email/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubscriber = await subscription.findByIdAndDelete(id);
    if (!deletedSubscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    res.status(200).json({ message: 'Subscriber deleted successfully' });
  } catch (err) {
    console.error('Error deleting subscriber', err);
    res.status(500).json({ message: 'Internal server error while deleting subscriber' });
  }
});

module.exports = router;
