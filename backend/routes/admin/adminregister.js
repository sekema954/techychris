const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/admin/account');
require('dotenv').config();

const router = express.Router();

// Register admin (only once)
router.post('/admin/register', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(403).json({ message: "Admin already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ fullname, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
