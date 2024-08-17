import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
   
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const User = new mongoose.model("User", userModel);
