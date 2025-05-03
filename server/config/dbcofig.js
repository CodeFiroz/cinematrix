import mongoose from "mongoose";

const connectDB = ()=>{
    try{

        const connection = mongoose.connect(process.env.MONGO_URI);

        console.log(`💡 connected to MONGODB`);
        

    }catch(error){
        console.warn(`😵 can't to reach database`);
        console.log(error);
           
    }
}

export default connectDB;