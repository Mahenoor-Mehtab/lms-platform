import {clerkClient} from '@clerk/express'
import Course from '../models/Course.js'
import {v2 as cloudinary} from 'cloudinary'

//! Update role to educator
export const updateRoleEducator = async (req, res)=>{

    try{
       const userId = req.auth?.userId
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
        const educatorId = req.auth?.userId

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
    const newCourse = await Course.create(parsedCourseData)

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
    newCourse.courseThumbnail = imageUpload.secure_url
    await newCourse.save()

    res.status(200).json({success:true , message: 'Course Added'})
    
  }catch(error){
    console.log("Internal server error. Please try again.:", error)
         res.status(500).json({
      success: false,
      message: error.message,
    });

    }
}


//! GET EDUCATOR COURSES:
export const getEducatorCourses = async (req , res)=>{
  try{
  const educator = req.auth.userid;
  const courses = await Course.find({educator})
  res.status(200).json({success:true , courses})
  }catch(error){
    console.log("not get educator courses")
    res.json({success:false, message: error.message})
  }

}
