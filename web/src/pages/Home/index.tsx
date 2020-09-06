import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import api from '../../services/api';

import Post from '../../components/Post';
import Profile from '../../components/Profile';

import './styles.scss';

export interface PostProps {
  postId: string;
  body: string;
  userHandle: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  userImage: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    api
      .get('posts')
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {posts.length > 0 ? (
          posts.map(post => (
            <Post key={post.postId} post={post}>
              {post.body}
            </Post>
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
