import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Sign Up

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.status(400).json("User already exists");
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

// Sign in

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    console.log(User);

    if (!user) {
      return res.status(404).json("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id.toString(), username: user.username },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      token,
      message: "User logged in successfully",
      username: user.username,
      balance: user.balance,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

// get single user

export const getUser = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

// delete a user
export const deleteUser = async (req, res) => {
  const _id = req.params.id;

  try {
    const deleteUser = await User.findByIdAndDelete(_id);
    if (!deleteUser) {
      return res.status(404).json("User not found");
    }

    res.status(200).json("User deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

// get all Users

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

//get coins
export const coins = async (req, res) => {
  const userId = req.userId; 

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(user.balance);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

//update coins

export const updateCoins = async (req, res) => {
  const { id, coins } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json("User not found");
    }
    
    user.balance = coins;
    await user.save();

    res.status(200).json(user.balance);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const token = () => {
  const token = jwt.sign("Hashir Akbar", process.env.JWT_SECRET);

  console.log(token);

  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  console.log(decodeToken);
};
// token();
