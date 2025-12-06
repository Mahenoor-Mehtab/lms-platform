import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose.connection.on('coonected' , ()=> console.log('Database Connected')) // Ye ek event listener hai.  Mongoose internally jab database se connection establish karta hai, tab ye "connected" event emit karta hai.

    await mongoose.connect(`${process.env.MONGO_DB_URI}/lms`)
     console.log(`🟢 MongoDB Connected`);
}

export default connectDB