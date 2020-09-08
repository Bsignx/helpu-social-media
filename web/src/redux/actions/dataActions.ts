import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST } from '../types';

import api from '../../services/api';

// Get all posts
export const getPosts = () => (dispatch: any) => {
  dispatch({ type: LOADING_DATA });
  api
    .get('/posts')
    .then(res => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
    });
};

// Like a post
export const likePost = (postId: string) => (dispatch: any) => {
  console.log(postId);
  api
    .get(`/posts/${postId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};
// Unlike a post
export const unlikePost = (postId: string) => (dispatch: any) => {
  api
    .get(`/posts/${postId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};
