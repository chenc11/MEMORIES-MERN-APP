import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost,
  commentPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//access by localhost:5000/posts
router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);

router.patch("/:id/likePost", auth, likePost); //only like one time for a specific id
router.post("/:id/commentPost", auth, commentPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.post("/", auth, createPost); //to create a post you need to login first

export default router;
