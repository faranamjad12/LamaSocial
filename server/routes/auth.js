// const router = require("express").Router();
import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOTP, sendEmail } from "../utils/common.js";
// import { useNavigate } from "react-router";
const authrouter = Router();

// const navigate = useNavigate();
// const User = require("../models/User");

// const bcrypt = require("bcrypt");
// const cors = require("cors");

// router.get("/", (req,res) => {
//     res.send("hey, its auth route");
// })

// //REGISTER - testing
// router.get("/register", async (req, res) => {
//     const user = await new User({
//         username: "wick",
//         email: "wick@gmail.com",
//         password: "7891011"
//     })
//     await user.save();
//     res.send("ok");
// })
// app.use(cors());
//REGISTER
authrouter.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      profilePicture: req.body.profilePicture,
      coverPicture: req.body.coverPicture,
      followers: [],
      followings: [],
      isAdmin: false,
      desc: req.body.desc,
      city: req.body.city,
      from: req.body.from,
      relationship: 2,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

//Logout
authrouter.get("/logout", async (req, res) => {
  try {
    // navigate("/login");
    // localStorage.removeItem("USER");
    res.status(200).json("User logged out successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN
authrouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!validPassword) return res.status(400).json("wrong password");

    const authUser = { id: user._id };
    const secret = "lemonmalt";
    const token = jwt.sign(authUser, secret, { expiresIn: "7d" });

    return res.status(200).json({ user, token });
  } catch (err) {
    // console.log(err);
    return res.status(500).json(err);
  }
});

authrouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  // console.log({ email });
  // return null;
  try {
    const user = await User.findOne({
      email,
      // : req.body.email
    });
    if (!user) {
      return res.send({
        status: false,
        message: "User not found with this email",
      });
    }

    const otp = generateOTP();

    user.otp = otp;
    user.isOtpVerified = false;

    await user.save();

    const html = `<p>Your OTP code is: <b>${otp}</b></p>`;

    await sendEmail(email, "Password Reset OTP", html);


console.log("OTP Code:", otp);

    return res.send({
      status: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.log("ERR:", error);
  }

  
});

authrouter.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({
        status: false,
        message: "User not found with this email",
      });
    }
    if (user.otp !== otp) {
      return res.send({
        status: false,
        message: "Given OTP is invalid",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const encPass = await bcrypt.hash(newPassword, salt);
    user.password = encPass;
    user.isOtpVerified = true;
    user.otp = null;

    await user.save();
    return res.send({
      status: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log("ERR:", error);
  }
});

// module.exports = router

export default authrouter;
