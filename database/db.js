import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();
const Connection= async()=>{
    try {
        //{useNewUrlParser: true}
        const connectionInstance=await mongoose.connect(process.env.MONGODB_URI);
        console.log("DataBase Connection Successfull:",connectionInstance.connection.host);
    } catch (error) {
        console.log("Error connecting the database ",error);
    }
}

export default Connection;