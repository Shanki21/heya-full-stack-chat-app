//code for generating jwttoken and sending it to a user in a httponly cookie it is more secure 
import jwt from "jsonwebtoken"

export const generateToken= (userId, res) =>{
    //we put userId in token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {  //generated token valid for 7 day 
        expiresIn:"7d"
    })

    res.cookie("jwt",token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //MS
        httponly: true, //prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", //CSRF aatacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
}