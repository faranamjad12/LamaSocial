// const express = require("express");
import express from "express";
const app = express();

// import { createRequire } from "module";

// const require = createRequire(import.meta.url);

// const express = require("express");

// const mongoose = require("mongoose");
import mongoose from "mongoose";
// const dotenv = require("dotenv");
import dotenv from "dotenv";
// const helmet = require("helmet");
import helmet from "helmet";
// const morgan = require("morgan");
import morgan from "morgan";
// const helmet = require("helmet");
// const morgan = require("morgan");

// import usersrouter from "/routes/users.js";
import usersrouter from "./routes/users.js";
import authrouter from "./routes/auth.js";
import postsrouter from "./routes/posts.js";

// const userRoute = require("./routes/users");
// const authRoute = require("./routes/auth");
// const postRoute = require("./routes/posts");
// const cors = require("cors");
import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  },
);

//middleware
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", usersrouter);
app.use("/api/auth", authrouter);
app.use("/api/posts", postsrouter);

app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});
// app.get("/users", (req,res) => {
//     res.send("Welcome to Users page");
// })

app.listen(8800, () => {
  console.log("Backend server is running");
});
