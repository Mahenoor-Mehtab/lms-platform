import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

const app = express()

connectDB(); // connection function call karta for connecting with database

app.use(cors()) // connect our backend with any other domain

app.get('/',(req, res)=> res.send('API Working'));
app.post('/clerk', express.json() , clerkWebhooks)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})