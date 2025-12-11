import User from "../models/User.js";

export const getUserData = async (req , res)=>{
    try{
        const userId = req.auth.userId;
        const user = await User.findById(userId);

        if(!user){
            return res.json({success: false , message: 'User not found'})
        }

        req.status(200).json({success: true , user})
    }catch(error){
        req.status(500).json({success: false , message: error.message})

    }

}

// Users enrolled Courses with lecture links:
export const  userEnrolledCourses = async (req , res)=>{
    try{
          const userId = req.auth.userId
          const userData = await User.findById(userId).populate('enrolledCourses')

          res.status(200).json({success:true , enrolledCourses: userData.enrolledCourses})
    }catch(error){
        res.status(500).json({success:false , message: error.message })

    }
}

