import {clerkClient} from '@clerk/express'
import Course from '../models/Course.js'
import {v2 as cloudinary} from 'cloudinary'

//! Update role to educator
export const updateRoleEducator = async (req, res)=>{

    try{
       const userId = req.auth().userId
       await clerkClient.users.updateUserMetadata(userId , {publicMetadata:{
        role:'educator',
       }})


    res.json({success:true , message:"You can publish a course now "})

    }catch(error){
        console.log("error on update role of edu cator")
        res.json({success:false , message: error.message})


    }
}

//! Add New Course
export const addCourse = async (req , res)=>{
    try{
        const { courseData } = req.body
        const imageFile = req.file
        const educatorId = req.auth().userId

        if (!imageFile) {
  return res.status(400).json({ message: "Course thumbnail image is required" });
} 

        if (!educatorId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login first",
      });
    }
      
    if (!courseData) {
      return res.status(400).json({
        success: false,
        message: "Course data is required",
      });
    }

     let parsedCourseData;
    try {
      parsedCourseData = JSON.parse(courseData);
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format in course data",
      });
    }
    parsedCourseData.educator = educatorId
    const newCouse = await Course.create(parsedCourseData)

  // Validate image file type
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(imageFile.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only JPEG, PNG, and WebP images are allowed",
      });
    }

    // upload image on cloudinary:
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCouse.courseThumbnail = imageUpload.secure_url
    await newCouse.save()

    res.status(200).json({success:true , message: 'Course Added'})
    
  }catch(error){
         res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });

    }
}