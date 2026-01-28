import mongooose from "mongoose";
import {ENV} from "./env.js";
export const connectDB=async (url)=>{
    try {
        const {MONGO_URL}=ENV;
        if(!MONGO_URL){
            throw new Error("MONGO_URL is not defined in environment variables");
        }
        const conn = await mongooose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully : "+conn.connection.host);
    } catch (error) {
        console.error("Error connecting to database : "+error);
        process.exit(1); //1 means failure

    }
}