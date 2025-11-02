const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
    title:{type:String, required:true},
    instructor: {type:String, required:true},
    sypnosis: {type:String, required:true},
    rating: {type:Number, required:false},
    price:{type:Number, required:true},
    discount: {type:Number, required:false},
    tage:{type: [String], required:false},
    link:{type:String, required:true}
}, {timestamps:true});

const courses = mongoose.model("courses", CoursesSchema);
module.exports = courses;