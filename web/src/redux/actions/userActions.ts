import {
  SET_UNAUTHENTICATED,
  SET_USER,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ERRORS,
  LOADING_USER,
} from '../types';

import api from '../../services/api';

const setAuthorizationHeader = (token: string): any => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  api.defaults.headers.common.Authorization = FBIdToken;
};

export const getUserData = () => (dispatch: any) => {
  dispatch({ type: LOADING_USER });
  api
    .get('/user')
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch(err => console.error(err));
};

export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  api
    .post('/login', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
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

export const editUserDetails = (userDetails: any) => (dispatch: any) => {
  dispatch({ type: LOADING_USER });
  api
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const signupUser = (newUserData: any, history: any) => (
  dispatch: any,
) => {
  dispatch({ type: LOADING_UI });
  api
    .post('/signup', newUserData)
    .then(res => {
      console.log(res);
      setAuthorizationHeader(res.data.userToken);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
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

export const logoutUser = () => (dispatch: any) => {
  localStorage.removeItem('FBidToken');
  delete api.defaults.headers.common.Authorization;
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const uploadImage = (formData: any) => (dispatch: any) => {
  dispatch({ type: LOADING_USER });
  api
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};
