import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './config/cloudinary.js'

const app = express()

connectDB(); // connection function call karta for connecting with database
await connectCloudinary() // connect to the cloudinary storage

app.use(cors()) // connect our backend with any other domain
app.use(clerkMiddleware()) //add auth porperties in all the request

app.get('/',(req, res)=> res.send('API Working'));
app.post('/clerk', express.json() , clerkWebhooks)

// router for educator:
app.use('/api/educator', express.json(), educatorRouter)


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})