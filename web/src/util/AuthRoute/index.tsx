import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface AuthProps {
  component: any;
  authenticated?: boolean;
  path: string;
}

const AuthRoute: React.FC<AuthProps> = ({
  component: Component,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state: any): any => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
