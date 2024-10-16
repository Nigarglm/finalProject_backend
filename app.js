import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/user.routes.js'
import authRotes from './routes/auth.routes.js'
import cors from 'cors'

const app = express()

dotenv.config()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use('/users', userRoutes);
app.use('/auth', authRotes)


const PORT = process.env.PORT
const MONGODB_URL =process.env.MONGODB_URL

app.listen(PORT, ()=>{
    console.log(`Server listening on Port : ${PORT}`)
})

mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log("Database connection established")
})
.catch((err)=>{
    console.log(err);
})