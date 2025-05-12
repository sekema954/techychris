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

// POST a blog
router.post('/blogs', (req, res) => {
  const blogs = readData(blogPath);
  const newBlog = { id: uuidv4(), ...req.body };
  blogs.push(newBlog);
  writeData(blogPath, blogs);
  res.status(201).json(newBlog);
});

module.exports = router;
