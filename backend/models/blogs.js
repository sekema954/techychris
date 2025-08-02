const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true },
  intro: { type: String, required:true },
  middle_context: { type: String, required: true },
  conclusion: { type: String, required:true },
  thumbnail: { type: String, required:true },
  hero_image: { type: String, default: '' },
  categories: { type: [String], required:true },
  tags: { type: [String], required:true },
  creator: { type: String, required:true },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
