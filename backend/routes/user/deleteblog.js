const express = require('express');
const router = express.Router();
const Blog = require('../../models/blogs');

// DELETE a blog by ID
router.delete('/delete/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({
      message: 'Blog deleted successfully',
      deleted: blog
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
