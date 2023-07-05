import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()
import authRoute from './routes/auth.js'
import usersRoute from './routes/user.js'
import hotelsRoute from './routes/hotel.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import path from 'path'
// import {MONGO,JWT} from './config/keys.js'
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const port = process.env.PORT || 8800


const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

const connect = async() =>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to Mongodb")
    } catch (error) {
        console.log(error)
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB Disconnected")
})
mongoose.connection.on("connected",()=>{
    console.log("MongoDB Connected")
})

connect()

//MiddleWares
app.use('/api/auth',authRoute)
app.use('/api/users',usersRoute)
app.use('/api/hotels',hotelsRoute)
app.use('/api/rooms',roomsRoute)

app.use((err,req,res,next) =>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack : err.stack
    });
});

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(port,()=>{
    console.log("Server Running on port 8800")
})

