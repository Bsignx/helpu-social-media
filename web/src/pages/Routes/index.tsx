import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import { SET_AUTHENTICATED } from '../../redux/types';
import { logoutUser, getUserData } from '../../redux/actions/userActions';
import store from '../../redux/store';

import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import Navbar from '../../components/layout/Navbar';

import theme from '../../styles/theme';
import AuthRoute from '../../util/AuthRoute';
import api from '../../services/api';

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken: any = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    api.defaults.headers.common.Authorization = token;
    store.dispatch(getUserData());
  }
}

const Routes: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/signup" component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Routes;
