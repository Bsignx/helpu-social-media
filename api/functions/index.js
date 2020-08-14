const functions = require("firebase-functions");
const express = require("express");

const { FBAuth } = require("./util/fbAuth");
const {
  postOnePost,
  getAllPosts,
  getPost,
  commentOnPost,
} = require("./controllers/posts");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require("./controllers/users");



const app = express();

// Post routes
app.get("/posts", getAllPosts);
app.post("/post", FBAuth, postOnePost);
app.get("/post/:postId", getPost);
app.post("/post/:postId/comment", FBAuth, commentOnPost);

// User routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);
