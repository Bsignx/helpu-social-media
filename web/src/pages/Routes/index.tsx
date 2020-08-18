import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import Navbar from '../../components/Navbar';
import theme from '../../styles/theme';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Routes;
