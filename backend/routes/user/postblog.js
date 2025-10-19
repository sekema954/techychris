const express = require('express');
const router = express.Router();
const Blog = require('../../models/blogs');

// POST a new blog
router.post('/post/blogs', async (req, res) => {
  try {
    const {
      title,
      slug,
      intro,
      middle_context,
      conclusion,
      thumbnail,
      hero_image,
      categories,
      tags,
      creator,
    } = req.body;

    // Validate required fields
    if (!title || !slug || !intro || !middle_context || !conclusion || !categories || !tags || !creator) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Validate array types
    if (categories && !Array.isArray(categories)) {
      return res.status(400).json({
        success: false,
        message: 'Categories must be an array of strings',
      });
    }

    if (tags && !Array.isArray(tags)) {
      return res.status(400).json({
        success: false,
        message: 'Tags must be an array of strings',
      });
    }

    const newBlog = new Blog({
      title,
      slug,
      intro,
      middle_context,
      conclusion,
      thumbnail,
      hero_image,
      categories,
      tags,
      creator,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ success: true, data: savedBlog });

    if(!savedBlog) throw new Error("Failed to save blog");

  } catch (error) {
    console.error('Error creating blog:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

module.exports = router;
