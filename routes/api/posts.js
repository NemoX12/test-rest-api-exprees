const express = require("express");
const router = express.Router();
const uuid = require("uuid");

let posts = require("../json/Posts");

// GET all users
router.get("/", (req, res) => {
  res.json(posts);
});

// Find Specific User
router.get("/:id", (req, res) => {
  const found = posts.some((post) => post.id === parseInt(req.params.id));

  if (found) {
    res.json(posts.filter((post) => post.id === parseInt(req.params.id)));
  } else {
    res.sendStatus(404);
  }
});

// Post new "post"
router.post("/", (req, res) => {
  let newPost = {
    id: uuid.v4(),
    title: req.body.title,
    description: req.body.description,
  };

  if (!newPost.title || !newPost.description) {
    return res.sendStatus(400);
  }

  posts.push(newPost);
  res.json({ message: "Post Created" });
});

// Update post
router.put("/:id", (req, res) => {
  const found = posts.some((post) => post.id === parseInt(req.params.id));

  if (found) {
    const updatePost = req.body;
    posts.forEach((post) => {
      if (post.id === parseInt(req.params.id)) {
        post.title = updatePost.title ? updatePost.title : post.title;
        post.description = updatePost.description
          ? updatePost.description
          : post.description;
        res.json({ msg: "Post Updated", posts });
      }
    });
  }
});

// Delete user
router.delete("/:id", (req, res) => {
  const found = posts.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    posts = posts.filter((user) => user.id !== parseInt(req.params.id));
    res.json({
      msg: "User deleted.",
      users: posts,
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
