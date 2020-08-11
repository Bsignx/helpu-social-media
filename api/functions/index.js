const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

const app = express();

admin.initializeApp();

app.get('/posts', (req, res) => {
 admin
   .firestore()
   .collection("posts")
   .orderBy('createdAt', 'desc')
   .get()
   .then((data) => {
     let posts = [];
     data.forEach((doc) => {
       posts.push({
         postId: doc.id,
         body: doc.data().body,
         userHandle: doc.data().userHandle,
         createdAt: doc.data().createdAt,
       });
     });
     return res.json(posts);
   })
   .catch((err) => console.log(err));
})

app.post('/post', (req, res) => {
if (req.method !== "POST") {
  return res.status(400).json({ error: "Method not allowed" });
}
const newPost = {
  body: req.body.body,
  userHandle: req.body.userHandle,
  createdAt: new Date().toISOString(),
};

admin
  .firestore()
  .collection("posts")
  .add(newPost)
  .then((doc) => {
    return res.json({
      messsage: `document ${doc.id} created successfully`,
    });
  })
  .catch((err) => {
    return res.status(500).json({ error: `something went wrong. ${err}` });
  });
})



exports.api = functions.https.onRequest(app);