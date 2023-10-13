import express, { response } from 'express';

const app = express();

app.get('/',(request, response)=>{
    return response.status(200).send("home page")
})


app.listen('3000',()=>{
    console.log('Server is running on port 3000');
})
