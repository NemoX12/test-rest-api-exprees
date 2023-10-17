const express = require("express");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const comments = require("./routes/api/comments");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static("Public"));

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/comments", comments);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
