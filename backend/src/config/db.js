import mongoose from "mongoose"

export const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED SUCCESFULLY!");
        
    }catch(error){
        console.error("Error connecting to mongoDB",error);
        process.exit(1);
    }
}