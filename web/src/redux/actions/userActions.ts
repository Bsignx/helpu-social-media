import { SET_USER, CLEAR_ERRORS, LOADING_UI, SET_ERRORS } from '../types';
import api from '../../services/api';

export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  api
    .post('/login', userData)
    .then(res => {
      const FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
      api.defaults.headers.common['Authorization'] = FBIdToken;
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

export const getUserData = () => (dispatch: any) => {
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
