import {v2 as cloudinary} from 'cloudinary'
import 'dotenv/config'

const connectCloudinary = async ()=>{
    console.log('Cloudinary Secret exists:', !!process.env.CLOUDINARY_API_SECRET)
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY

    })
}

export default connectCloudinary;