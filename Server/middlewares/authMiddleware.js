import {clerkClient}  from '@clerk/express'

// Middleware ( Protect Educate Routes )
export const protectEducator = async (req , res, next)=>{     try{
    const userId = req.auth?.userId
    const response = await clerkClient.users.getUser(userId)

    if(response.publicMetadata.role !== 'educator'){
        return res.json({success: false , message: 'Unauthorized Access'})
    }

  next()
  
}catch(error){
    console.log("user not authenticate");
    res.json({success:false , message: error.message})


}

}