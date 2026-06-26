// const router = require("express").Router();
import { Router } from "express";
const postsrouter = Router();
// const Post = require("../models/Post");
import Post from "../models/Post.js";
// const User = require("../models/User");
import User from "../models/User.js";
// const path = require('path');
import path from "path";
import { authMiddleware } from "../middlewares/authMiddleware.js";
// const cors = require("cors");

// router.get("/", (req, res) => {
//     console.log("post page");
// })
// app.use(cors());
// console.log("postsrouter file loaded");

// postsrouter.use((req, res, next) => {
//   console.log("Posts router request:", req.method, req.originalUrl);
//   next();
// });

// download an image via Shared Link (authMiddlare, done)

postsrouter.get(
  "/image/download/:filename",
  authMiddleware,
  async (req, res) => {
    // console.log(req.params.filename);

    try {
      const post = await Post.find({ desc: req.params.filename });

      if (!post[0] || !post[0].img) {
        return res.status(404).json("Image not found");
      }

      const imageBuffer = Buffer.from(post[0].img, "base64");

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${post[0].desc}.jpg`,
      );

      res.setHeader("Content-Type", "image/jpeg");

      res.send(imageBuffer);
    } catch (err) {
      console.log("DOWNLOAD ERROR:", err);
      // res.status(500).json(err);
      return res.status(401).json({
        message: err.message,
      });
    }
    // const filePath = path.join(__dirname, "../uploads", req.params.filename);

    // res.download(filePath);
  },
);

//create a post (done) (authMiddlare, done)

postsrouter.post("/create", authMiddleware, async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post (done) (authMiddlare, done)

postsrouter.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json(err);
  }
});

//delete a post (done) (authMiddlare, done)

postsrouter.delete("/delete/:id", authMiddleware, async (req, res) => {
  // const post = await Post.findById(req.params.id);
  // console.log(post);
  try {
    // const post = await Post.findById(req.params.id);
    // if (post.userId === req.body.userId) {
    //   await post.deleteOne();
    //   res.status(200).json("the post has been deleted");
    // } else {
    //   res.status(403).json("you can delete only your post");
    // }
    const deleted = await Post.findByIdAndDelete(req.params.id);
    // console.log("Deleted document:", deleted);
    res.status(200).json("the post has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//like / dislike a post (unused)

postsrouter.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// {I think so that this route is not used, while it works to get all posts of a single user (done) (authMiddlare)

postsrouter.get("/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts (done), I think so this function is not used.

postsrouter.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post for post_details page (authMiddlare, done)

postsrouter.get("/post_details/:id", authMiddleware, async (req, res) => {
  try {
    // const post = await Post.findById({ _id: req.params.id });
    const post = await Post.findById(req.params.id);
    // const posts = await Post.find(req.params.id);
    // console.log(req.params.id);
    // const posts = await Post.find({
    //   userId: req.params.id,
    // });
    // const post = await Post.find({
    //   userId: req.params.id,
    // });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts of single user (done) (authMiddlare, done)

postsrouter.get("/post/:id", authMiddleware, async (req, res) => {
  try {
    // const post = await Post.findById({ _id: req.params.id });
    // const post = await Post.findById(req.params.id);
    // const posts = await Post.find(req.params.id);
    // console.log(req.params.id);
    const posts = await Post.find({
      userId: req.params.id,
    });
    // const post = await Post.find({
    //   userId: req.params.id,
    // });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

// router.get("/timeline/all", async (req, res) => {
//     try {
//       const currentUser = await User.findById(req.body.userId);
//       const userPosts = await Post.find({ userId: currentUser._id });
//       const friendPosts = await Promise.all(
//         currentUser.followings.map((friendId) => {
//           return Post.find({ userId: friendId });
//         })
//       );
//       res.json(userPosts.concat(...friendPosts))
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// router.get("/timeline/:userId", async (req, res) => {

//get timeline posts (unused)

postsrouter.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    const userPosts = await Post.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      }),
    );

    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

export default postsrouter;
