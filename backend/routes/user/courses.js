const express = require('express');
const router = express.Router();
const courses = require('../../models/courses');

router.get('/courses', async (req,res)=>{
   try{
    const Courses = await courses.find();
    if(Courses.length <= 0) {
        return res.status(400).json({message:"No courses available"});
    }

    return res.status(200).json({
        message:`${Courses.length} courses were found`,
        data:Courses
    });

   } catch(err) {
    return res.status(500).json({message: "Internal Server Error", err});
   }
});

module.exports = router;