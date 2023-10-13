import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';

dotenv.config()
const app = express();
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Database connected successfully")
}).catch((error)=>{
    console.log(error)
})

app.listen('3000',()=>{
    console.log('Server is running on port 3000');
})

app.use("/api/user/", userRouter)
app.use("/api/auth/", authRouter)