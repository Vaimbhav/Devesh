const express = require("express");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

const router = express.Router();

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Extract token after "Bearer"

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

// Get all posts (public)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res
      .status(500)
      .json({ message: "Error fetching posts", error: err.message });
  }
});

// Create a new post (authenticated)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const post = new Post({
      ...req.body,
      author: req.user.id, // Ensure req.user.id is correctly set by JWT middleware
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error("Error creating post:", err);
    res
      .status(500)
      .json({ message: "Error creating post", error: err.message });
  }
});

// Edit a post (authenticated)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not the author of this post" });
    }

    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error("Error updating post:", err);
    res
      .status(500)
      .json({ message: "Error updating post", error: err.message });
  }
});

// Get posts by the authenticated user (authenticated)
router.get("/my-posts", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id }).populate("author", "username");
    res.json(posts);
  } catch (err) {
    console.error("Error fetching user's posts:", err);
    res.status(500).json({ message: "Error fetching user's posts", error: err.message });
  }
});


// Delete a post (authenticated)

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not the author of this post" });
    }

    await Post.findByIdAndDelete(req.params.id); // Use findByIdAndDelete instead of remove
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Error deleting post", error: err.message });
  }
});


module.exports = router;
