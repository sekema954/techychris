const express = require("express");
const router = express.Router();
const { upload } = require("../middlewear/cloudinary"); 

// POST /api/upload
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  // Cloudinary automatically returns the URL
  res.status(200).json({ url: req.file.path }); 
});

module.exports = router;
