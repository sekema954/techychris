const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  code: { type:String, requied:true }
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);
