/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  POST_POST,
  SET_POST,
} from '../types';

const initialState = {
  posts: [] as any,
  post: {} as any,
  loading: false,
};

export default function (state = initialState, action: any): any {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case LIKE_POST:
    case UNLIKE_POST:
      const index = state.posts.findIndex(
        (post: any) => post.postId === action.payload.postId,
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_POST:
      const findIndex = state.posts.findIndex(
        (post: any) => post.postId === action.payload,
      );
      state.posts.splice(findIndex, 1);
      return {
        ...state,
      };
    case POST_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
}
