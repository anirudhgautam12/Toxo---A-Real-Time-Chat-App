import mongooose from "mongoose";

export const connectDB=async (url)=>{
    try {
        const conn = await mongooose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully : "+conn.connection.host);
    } catch (error) {
        console.error("Error connecting to database : "+error);
        process.exit(1); //1 means failure

    }
}