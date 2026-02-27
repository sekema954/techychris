// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet'); // <-- added
const os = require('os');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
require('dotenv').config();

// Routes
const getAllBlogsRoute = require('./routes/user/getallblogs');
const postBlog = require('./routes/user/postblog');
const editBlog = require('./routes/user/editblog');
const deleteBlog = require('./routes/user/deleteblog');
const subscribeEmails = require('./routes/user/subscription');
const adminRegister = require('./routes/admin/adminregister');
const adminLogin = require('./routes/admin/adminlogin');
const getEmails = require('./routes/admin/getemails');
const deleteSubscribers = require('../backend/routes/admin/deletesubscribers');
const sendEmailToSubscribers = require('./routes/admin/sendemail');
const postComments = require('./routes/user/comments');
const sendContact = require('./routes/admin/contact');
const uploadRoute = require('./routes/uploads');
const getCourses = require('./routes/user/courses');

const app = express();
const PORT = process.env.PORT || 3100;

/* ------------------- MIDDLEWARE ------------------- */

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://www.techychris.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("/*splat", cors());

// JSON parser
app.use(express.json());

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

/* ------------------- MONGODB CONNECTION ------------------- */
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(`MongoDB connected: ${mongoose.connection.name}`))
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

/* ------------------- ROUTES ------------------- */
// User routes
app.use('/api', getAllBlogsRoute);
app.use('/api', postBlog);
app.use('/api', editBlog);
app.use('/api', deleteBlog);
app.use('/api', subscribeEmails);
app.use('/api', postComments);
app.use('/api', uploadRoute);
app.use('/api', getCourses);

// Admin routes
app.use('/api', adminRegister);
app.use('/api', adminLogin);
app.use('/api', getEmails);
app.use('/api', deleteSubscribers);
app.use('/api', sendEmailToSubscribers);
app.use('/api', sendContact);

/* ------------------- HEALTH CHECK ------------------- */
app.get('/health', (req, res) => {
  const uptime = process.uptime(); // seconds
  const memoryUsage = process.memoryUsage(); // in bytes
  const loadAvg = os.loadavg(); // 1,5,15 min averages
  const freeMem = os.freemem();
  const totalMem = os.totalmem();
  const usedMem = totalMem - freeMem;

  res.json({
    status: 'OK',
    uptime: `${Math.floor(uptime)}s`,
    memory: {
      rss: memoryUsage.rss,
      heapTotal: memoryUsage.heapTotal,
      heapUsed: memoryUsage.heapUsed,
      external: memoryUsage.external,
      totalMem,
      usedMem,
      freeMem
    },
    loadAvg,
    timestamp: new Date().toISOString()
  });
});

/* ------------------- FRONTEND SERVE ------------------- */
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

/* ------------------- UTILITY ------------------- */
const readData = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath));
};
const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

/* ------------------- START SERVER ------------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});