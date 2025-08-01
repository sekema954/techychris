const express = require('express');
const router = express.Router();
const Blog = require('../../models/blogs');

// GET all blogs
router.get('/get/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: 'No blogs found' });
    }

    res.status(200).json(blogs);

  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

module.exports = router;
