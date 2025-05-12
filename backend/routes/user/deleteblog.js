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


// Delete a blog
router.delete('/blogs/:id', (req, res) => {
    const blogs = readData(blogPath);
    const blogExists = blogs.some(blog => blog.id === req.params.id);
  
    if (!blogExists) {
      return res.status(404).json({ message: 'Blog not found' });
    }
  
    const filteredBlogs = blogs.filter(blog => blog.id !== req.params.id);
    writeData(blogPath, filteredBlogs);
  
    res.json({ message: 'Blog deleted successfully', blogs: filteredBlogs });
  });  

module.exports = router;
