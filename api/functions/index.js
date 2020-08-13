const functions = require("firebase-functions");
const express = require("express");

const { postOnePost, getAllPosts } = require("./controllers/posts");
const { signup, login } = require("./controllers/users");
const { FBAuth } = require("./util/fbAuth");

const app = express();

// Post routes
app.get("/posts", getAllPosts);
app.post("/post", FBAuth, postOnePost);

// User routes
app.post("/signup", signup);
app.post("/login", login);

exports.api = functions.https.onRequest(app);
