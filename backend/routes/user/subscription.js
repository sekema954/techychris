const express = require('express');
const cors = require('cors');
const subscription = require('../../models/user/subscription');
const transporter = require('../../routes/nodemailer/mail');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const RECAPTCHA_SECRET_KEY = process.env.VITE_SECRET_KEY;

router.use(cors());
router.use(express.json());

router.post('/post/emails', async (req, res) => {
  try {
    const { email, token } = req.body;

    // Validate reCAPTCHA token
    if (!token) {
      return res.status(400).json({ message: "Missing reCAPTCHA token." });
    }

    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`;
    const response = await fetch(verifyURL, { method: 'POST' });
    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({ message: "reCAPTCHA verification failed." });
    }

    // Email Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    // Check if the email already exists
    const existing = await subscription.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Save to DB
    const newSubscriber = new subscription({ email });
    await newSubscriber.save();

    // Load Email Templates
    const AdminConfirmationTemplate = fs.readFileSync(path.join(__dirname, '../../templates/admingmail.html'), 'utf-8');
    const ClientConfirmationTemplate = fs.readFileSync(path.join(__dirname, '../../templates/clientgmail.html'), 'utf-8');

    const filledAdminTemplate = AdminConfirmationTemplate.replace('{{email}}', email);

    // Send Confirmation Email to Client
    await transporter.sendMail({
      from: `"TechyChris Newsletter" <no-reply@techychris.com>`,
      to: email,
      subject: "Subscription Confirmed",
      html: ClientConfirmationTemplate,
    });

    // Send Notification Email to Admin
    await transporter.sendMail({
      from: `"TechyChris Newsletter" <no-reply@techychris.com>`,
      to: process.env.VITE_EMAIL_USER,
      subject: "New Subscriber Alert",
      html: filledAdminTemplate,
    });

    res.status(201).json({ message: "New subscriber saved and confirmation email sent" });

  } catch (err) {
    console.error('Internal server error', err);
    res.status(500).json({ message: "Internal server error while subscribing" });
  }
});

module.exports = router;
