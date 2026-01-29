import express from "express";
import { ENV } from "./lib/env.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import Path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";


const app = express();
const __dirname = Path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json()); //req.body
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

//make ready for deployment
if(ENV.NODE_ENV==="production"){
    app.use(express.static(Path.join(__dirname,"../Frontend/dist")));

    app.get("*",(_,res)=>{
        res.sendFile(Path.resolve(__dirname,"../Frontend","dist","index.html"));
    })
}

app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT)
    connectDB()

});