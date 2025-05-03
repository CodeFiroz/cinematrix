/*
Project Name : Cinematrix
Developer: Firoz
*/

import express from "express"
import {config} from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbcofig.js";

import authRoutes from "./routes/authRoutes.js"

const app = express();

config(); // config dotenv
connectDB(); //connect mongoose database

const PORT = process.env.PORT || 3000; // define PORT

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));


app.use("/api/auth", authRoutes);

// start server
app.listen(PORT, ()=>{
    console.log(`⚡ Server started at :: ${PORT}`);
})