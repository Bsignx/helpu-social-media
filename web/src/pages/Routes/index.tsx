import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
