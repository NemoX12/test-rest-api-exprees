const express = require("express");
const router = express.Router();
const uuid = require("uuid");

let comments = require("../json/Comments");

// GET all comments
router.get("/", (req, res) => {
  res.json(comments);
});

// Find Specific Comment
router.get("/:id", (req, res) => {
  const found = comments.some(
    (comment) => comment.id === parseInt(req.params.id)
  );

  if (found) {
    res.json(
      comments.filter((comment) => comment.id === parseInt(req.params.id))
    );
  } else {
    res.sendStatus(404);
  }
});

// Post new "post"
router.post("/", (req, res) => {
  let newComment = {
    id: uuid.v4(),
    title: req.body.title,
    description: req.body.description,
  };

  if (!newComment.title || !newComment.description) {
    return res.sendStatus(400);
  }

  comments.push(newComment);
  res.json({ message: "Comment Created" });
});

// Update comment
router.put("/:id", (req, res) => {
  const found = comments.some(
    (comment) => comment.id === parseInt(req.params.id)
  );

  if (found) {
    const updateComment = req.body;
    comments.forEach((comment) => {
      if (comment.id === parseInt(req.params.id)) {
        comment.title = updateComment.title
          ? updateComment.title
          : comment.title;
        comment.description = updateComment.description
          ? updateComment.description
          : comment.description;
        res.json({ msg: "Comment Updated", comments });
      }
    });
  }
});

// Delete comment
router.delete("/:id", (req, res) => {
  const found = comments.some(
    (comment) => comment.id === parseInt(req.params.id)
  );

  if (found) {
    comments = comments.filter(
      (comment) => comment.id !== parseInt(req.params.id)
    );
    res.json({
      msg: "Comment deleted.",
      users: comments,
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
