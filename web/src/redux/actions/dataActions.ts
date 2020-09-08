import { DELETE_POST, LOADING_UI, POST_POST, CLEAR_ERRORS, SET_ERRORS } from './../types';
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

export const postPost = (newPost: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  api
    .post('/post', newPost)
    .then(res => {
      dispatch({
        type: POST_POST,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data.errors
          ? err.response.data.errors
          : err.response.data,
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

export const deletePost = (postId: any) => (dispatch: any) => {
  api
    .delete(`/posts/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch(err => console.log(err));
};
