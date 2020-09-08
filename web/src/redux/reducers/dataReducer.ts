/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
import { SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA } from '../types';

const initialState = {
  posts: [] as any,
  post: {},
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
    case LIKE_POST:
    case UNLIKE_POST:
      const index = state.posts.findIndex(
        (post: any) => post.postId === action.payload.postId,
      );
      state.posts[index] = action.payload;
      return {
        ...state,
      };
    default:
      return state;
  }
}
