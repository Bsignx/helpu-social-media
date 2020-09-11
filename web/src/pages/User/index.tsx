/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Post from '../../components/post/Post';
import StaticProfile from '../../components/profile/StaticProfile';

import { getUserData } from '../../redux/actions/dataActions';
import api from '../../services/api';

const User: React.FC = ({ data, match, getUserData }: any) => {
  const [profile, setProfile] = useState(null);
  const [postIdParam, setPostIdParam] = useState(null);
  useEffect(() => {
    const { handle, postId } = match.params;
    if (postId) setPostIdParam(postId);
    getUserData(handle);
    api
      .get(`/user/${handle}`)
      .then(res => {
        setProfile(res.data.userData.user);
      })
      .catch(err => console.log(err));
  }, []);

  const { posts, loading } = data;

  const postsMarkup = loading ? (
    <p>Loading data...</p>
  ) : posts === null ? (
    <p>No posts from this user</p>
  ) : !postIdParam ? (
    posts.map((post: any) => <Post key={post.createdAt} post={post} />)
  ) : (
    posts.map((post: any) => {
      if (post.postId !== postIdParam)
        return <Post key={post.postId} post={post} />;
      return <Post key={post.postId} post={post} openDialog />;
    })
  );

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {postsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <p>Loading profile...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: any): any => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);
