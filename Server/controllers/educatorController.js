import {clerkClient} from '@clerk/express'
import Course from '../models/Course.js'
import {v2 as cloudinary} from 'cloudinary'
import { Purchase } from '../models/Purchase.js'

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
  const educator = req.auth?.userId;
  if(!educator){
    return res.status(500).json("educator is unauthorized");
  }
  const courses = await Course.find({educator})
  res.status(200).json({success:true , courses})
  }catch(error){
    console.log("not get educator courses")
    res.json({success:false, message: error.message})
  }

}

//! Get educator dashboard Data (Total Earning , Enrolled Students , No of Courses)

export const educatorDashboardData = async (req , res)=>{
  try{
    const educator = req.auth?.userId;
    const courses = await Course.find({educator});
    const totalCourses = courses.length;

    const courseIds = courses.map(course => course._id);

    // Calculate total earnings from purchases:
    const purchases = await Purchase.find({
      courseId:{$in : courseIds}, status: 'completed'
    });
    const totalEarnings = purchases.reduce((sum , purchase)=> sum + purchase.amount , 0);

    // Collect unique student IDs with their course titles:
    const enrolledStudentsData = [];
    for( const course of courses){
      const students = await User.find({
        _id: {$in : course.enrolledStudents}
      }, 'name imageUrl');

      students.forEach(student => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student
        });
      });
    }

    re.status(200).json({success: true , dashboardData :{
      totalEarnings , enrolledStudentsData , totalCourses
    }})


  }catch(error){
    res.json({ success: false, message: error.message });

  }
}

// get Enrolled Students Data with Purchase Data:
export const getEnrolledStudentsData = async (req , res)=>{
  try{
    const educator = req.auth.userId;
    const courses = await Course.find({educator});
    const courseIds = courses.map(course => course._id);

    const purchase = await Purchase.find({
      courseId: { $in: courseIds},
      status: 'completed'
    }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle')

    const enrolledStudents = purchase.map( purchase => ({
      student: purchase.userId , 
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt
    }))

    res.json({success: true, enrolledStudents})

  }catch(error){
     res.json({ success: false, message: error.message });

  }
}
