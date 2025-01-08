import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },   
    password: {
        type: String,
        required: true,
        minlength: 6,
    },   
    profilePic: {
        type: String,
        default: "",
    },
  },
  { timestamps: true} // for show "member since" of user
);
// created model named "User" which is depending on user Schema
const User = mongoose.model("User", userSchema); // database name "User"

export default User;