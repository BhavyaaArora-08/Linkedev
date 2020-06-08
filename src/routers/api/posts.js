const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");

// @route   POST api/posts
// @desc    Post a post
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").notEmpty()]],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    try {
      const user = req.user;
      const { text } = req.body;
      const postDetails = {
        user: user.id,
        text,
        avatar: user.avatar,
        name: user.name,
      };

      let post = await new Post(postDetails);
      //   post = await Post.findOne({ user: user.id }).populate("user", ["avatar"]);
      await post.save();

      res.send(post);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/posts/:id
// @desc    Get a particular post
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Access denied" });
    }

    await post.remove();
    res.json({ msg: "Post was deleted successfully" });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.json(400).json({ msg: "Post has already been liked" });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json({ msg: "Post has been liked", likes: post.likes });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if the post has already been liked
    if (
      (post.likes.filter(
        (like) => like.user.toString() === req.user.id
      ).length = 0)
    ) {
      return res
        .json(400)
        .json({ msg: "You did't like the post at te first place!!" });
    }

    post.likes = await post.likes.filter((like) => like.user != req.user.id);
    await post.save();
    res.json({ msg: "Post has been unliked", likes: post.likes });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   PUT api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.put("/comment/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // unshift adds to the start
    post.comments.unshift({
      user: req.user.id,
      text: req.body.text,
      avatar: req.user.avatar,
    });
    await post.save();
    res.json({
      msg: "Successfully commented on the post!",
      comments: post.comments,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/posts/comment/:id_post/:comment_id
// @desc    Remove a comment from a post
// @access  Private
router.delete("/comment/:id_post/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id_post);
    const id_of_comment = req.params.comment_id;
    const id_of_client = req.user.id;

    const comment = post.comments.find(
      (comment) => comment.id === id_of_comment
    );

    if (!comment) {
      return res.status(404).json({ msg: "No such comment found" });
    }

    if (id_of_client != comment.user.toString()) {
      return res.status(401).json({ msg: "Access denied" });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(id_of_client);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
