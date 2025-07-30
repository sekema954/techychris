const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../../models/admin/account');
require('dotenv').config();

const router = express.Router();

// POST /admin/register (manual registration with secret code)
router.post('/admin/register', async (req, res) => {
  try {
    const { fullname, email, password, code } = req.body;


    // Check code first before any DB lookup
    if (code.trim() !== process.env.SECRET_CODE.trim()) {
      return res.status(401).json({ message: "Invalid secret code." });
    }

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already registered." });
    }

    // Create new admin
    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = new Admin({ fullname, email, password: hashedPassword });

    await newAdmin.save();
    return res.status(201).json({ message: "Admin registered successfully." });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
