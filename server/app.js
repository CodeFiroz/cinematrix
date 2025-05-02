import express from "express"
import config from "dotenv"

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("Hii Server");
    
})

app.listen(PORT, ()=>{
    console.log("Server is start :: http://localhost:"+PORT);
})