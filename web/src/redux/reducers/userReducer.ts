/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import {
  SET_AUTHENTICATED,
  SET_USER,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST,
  MARK_NOTIFICATIONS_READ,
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {} as any,
  likes: [] as any,
  notifications: [],
};

export default function (state = initialState, action: any): any {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            postId: action.payload.postId,
          },
        ],
      };
    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          (like: any) => like.postId !== action.payload.postId,
        ),
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not: any) => (not.read = true));
      return {
        ...state,
      };
    default:
      return state;
  }
}
