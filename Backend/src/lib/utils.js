import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export function generateToken(userId,res) {
    const {JWT_SECRET} = ENV;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign({ userId},JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, //7 days
        httpOnly:true,  // prevent xss attacks : cross site scripting
        sameSite : "strict", // CSRF protection
        secure: ENV.NODE_ENV==="development" ? false : true, // set to true in production
    })

    return token;
}