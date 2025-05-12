// Backend (express)
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const commentsFile = path.join(__dirname, '../../json/comments.json');

// GET all comments or by postId (e.g. /comments?postId=abc-123)
router.get('/get/comments', (req, res) => {
  const postId = req.query.postId;

  try {
    const comments = JSON.parse(fs.readFileSync(commentsFile, 'utf-8'));

    if (postId) {
      const filtered = comments.filter(comment => comment.postId === postId);
      res.json(filtered);
    } else {
      res.json(comments);
    }
  } catch (error) {
    console.error('Error reading comments file:', error);
    res.status(500).json({ error: 'Failed to read comments data' });
  }
});

// POST a new comment
router.post('/post/comments', (req, res) => {
  const { postId, author, content } = req.body;

  if (!postId || !author || !content) {
    return res.status(400).json({ error: 'Missing required fields: postId, author, content' });
  }

  const newComment = {
    id: uuidv4(),
    postId,
    author,
    content,
    timestamp: new Date().toISOString()
  };

  try {
    const comments = JSON.parse(fs.readFileSync(commentsFile, 'utf-8'));
    comments.push(newComment);
    fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2));

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error saving comment:', error);
    res.status(500).json({ error: 'Failed to save the comment' });
  }
});

module.exports = router;
