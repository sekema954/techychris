const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  intro: { type: String, default: '' },
  middle_context: { type: String, default: '' },
  conclusion: { type: String, default: '' },
  content: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  hero_image: { type: String, default: '' },
  categories: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  creator: { type: String, default: '' },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
