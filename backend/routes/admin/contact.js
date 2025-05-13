const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

require('dotenv').config();

router.post('/send-contact', async (req, res) => {
  const { firstname, lastname, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.VITE_EMAIL_USER,
        pass: process.env.VITE_PASSWORD,
      },
    });

    // HTML template for site owner
    const htmlToOwner = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px;">
        <h2 style="color: #333;">New Contact Submission</h2>
        <p><strong>Name:</strong> ${firstname} ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #fff; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
          <p>${message}</p>
        </div>
        <p style="color: #999; font-size: 12px;">Sent from your website contact form.</p>
      </div>
    `;

    // HTML template for confirmation to sender
    const htmlToSender = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px;">
        <h2 style="color: #333;">Thanks for reaching out, ${firstname}!</h2>
        <p>I’ve received your message and will get back to you as soon as possible.</p>
        <h4 style="color: #555;">Here's what you sent:</h4>
        <div style="background-color: #fff; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
          <p>${message}</p>
        </div>
        <p style="margin-top: 20px;">Cheers,<br/>Chris</p>
        <hr style="margin-top: 30px;" />
        <p style="font-size: 12px; color: #999;">This is an automated response to confirm your message.</p>
      </div>
    `;

    // Email to site owner
    const mailOptionsToOwner = {
      from: email,
      to: process.env.VITE_EMAIL_USER,
      subject: `New Contact Form Submission from ${firstname} ${lastname}`,
      html: htmlToOwner,
    };

    // Confirmation email to sender
    const mailOptionsToSender = {
      from: process.env.VITE_EMAIL_USER,
      to: email,
      subject: 'Thanks for contacting me!',
      html: htmlToSender,
    };

    await transporter.sendMail(mailOptionsToOwner);
    await transporter.sendMail(mailOptionsToSender);

    res.status(200).json({ message: 'Emails sent successfully.' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Failed to send emails.' });
  }
});

module.exports = router;
