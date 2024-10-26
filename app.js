import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/user.routes.js'
import authRotes from './routes/auth.routes.js'
import movieRoutes from './routes/movie.routes.js'
import faqRoutes from './routes/faq.routes.js'
import contactRoutes from './routes/contact.routes.js'
import herosecRoutes from './routes/herosec.routes.js'
import logoRoutes from './routes/logo.routes.js'
import categoryRoutes from './routes/category.routes.js'
import commentRoutes from './routes/comments.routes.js'
import subscribtionRoutes from './routes/subscribtions.routes.js'
import cors from 'cors'

const app = express()

dotenv.config()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use('/users', userRoutes);
app.use('/auth', authRotes);
app.use('/movies', movieRoutes);
app.use('/faq', faqRoutes);
app.use('/contact', contactRoutes);
app.use('/hero', herosecRoutes);
app.use('/logo', logoRoutes);
app.use('/category', categoryRoutes);
app.use('/comments', commentRoutes);
app.use('/subscribtions', subscribtionRoutes);


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