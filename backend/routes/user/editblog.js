const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const blogPath = path.join(__dirname, '../../json/blog.json');

// Utility to read from file
const readData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

//  Utility to write to file
const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Edit a blog
router.put('/blogs/:id', (req, res) => {
    const blogs = readData(blogPath);
    const updatedBlogs = blogs.map(blog =>
      blog.id === req.params.id ? { ...blog, ...req.body } : blog
    );
    writeData(blogPath, updatedBlogs);
    res.json({ message: 'Blog updated', blogs: updatedBlogs });
  });
module.exports = router;
