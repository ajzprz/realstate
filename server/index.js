import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config()

const app = express();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Database connected successfully")
}).catch((error)=>{
    console.log(error)
})

app.get('/',(request, response)=>{
    return response.status(200).send("home page")
})


app.listen('3000',()=>{
    console.log('Server is running on port 3000');
})
