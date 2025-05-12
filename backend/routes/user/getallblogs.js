const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const blogPath = path.join(__dirname, '../../json/blog.json');

const readData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// GET /api/blogs
router.get('/blogs', (req, res) => {
  const blogs = readData(blogPath);
  res.json(blogs);
});

module.exports = router;
