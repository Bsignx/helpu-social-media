/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import Post from '../../components/post/Post';
import Profile from '../../components/profile/Profile';
import { getPosts } from '../../redux/actions/dataActions';

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

const Home: React.FC = ({ getPosts, data }: any) => {
  const { posts, loading } = data;
  useEffect(() => {
    getPosts();
  }, []);

  const recentPostsMarkup = !loading ? (
    posts.map((post: any) => <Post key={post.postId} post={post} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {recentPostsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: any): any => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPosts })(Home);
