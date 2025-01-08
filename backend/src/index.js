import express from "express";
import dotenv from "dotenv"; //for eccess environment variable
// importing local files needs the extension in the end bcz using tye module
import authRoutes from "./routes/auth.route.js"; //call this file for login signup
import messageRoutes from "./routes/message.route.js"; //call this file for login signup
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config()


const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json()); //allow to extract the json data out of body
app.use(cookieParser()); 
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,   //allow cookies to be sent with request    
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//path to static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  //path for react application
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB()
});