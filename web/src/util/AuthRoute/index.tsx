import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface AuthProps {
  component: any;
  authenticated: boolean;
  path: string;
}

const AuthRoute: React.FC<AuthProps> = ({
  component: Component,
  authenticated,
  path,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />}
  />
);
export default AuthRoute;
