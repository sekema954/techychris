// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
require('dotenv').config();
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

const app = express();
const PORT = process.env.PORT || 3100;

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use(express.json());

//Connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log(`MongoDB connection was successfull! ${mongoose.connection.name}`);
})
.catch((err)=>{
    console.error(`Error connecting to mongoDB`);
    process.exit(1);
});


//User Routes
app.use('/api', getAllBlogsRoute);
app.use('/api', postBlog);
app.use('/api', editBlog);
app.use('/api', deleteBlog);
app.use('/api', subscribeEmails);
app.use('/api', postComments);
app.use('/api', uploadRoute);

//Admin Routes
app.use('/api', adminRegister );
app.use('/api', adminLogin);
app.use('/api', getEmails);
app.use('/api', deleteSubscribers);
app.use('/api', sendEmailToSubscribers);
app.use('/api', sendContact);




// Utility functions
const readData = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};





app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))
app.get('/*splat', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})


/* -------------------- START SERVER -------------------- */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
