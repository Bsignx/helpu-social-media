import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import jwtDecode from 'jwt-decode';

import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import Navbar from '../../components/Navbar';

import theme from '../../styles/theme';
import AuthRoute from '../../util/AuthRoute';

const token = localStorage.FBIdToken;
let authenticated: boolean;
if (token) {
  const decodedToken: any = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    authenticated = false;
    window.location.href = '/login';
  } else {
    authenticated = true;
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
            <AuthRoute
              path="/login"
              component={Login}
              authenticated={authenticated}
            />
            <AuthRoute
              path="/signup"
              component={Signup}
              authenticated={authenticated}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Routes;
