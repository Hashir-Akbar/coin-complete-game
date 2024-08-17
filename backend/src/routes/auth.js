import {
  signUp,
  deleteUser,
  getUser,
  getUsers,
  signIn,
  coins,
  updateCoins,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import verifyToken from "../middleware/auth.middleware.js";

export const auth = new Router();

//sign-up
auth.post("/sign-up", signUp);

// sign-in
auth.post("/sign-in", signIn);

//get all users
auth.get("/users", verifyToken, getUsers);

//delete a user
auth.delete("/users/:id", deleteUser);

//get single user
auth.get("/users/:id", getUser);

//get coins

auth.get("/coins", verifyToken, coins);

//update coins
auth.patch("/coins", verifyToken, updateCoins);
