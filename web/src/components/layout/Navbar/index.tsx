import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import PostPost from '../../post/PostPost';
import Notifications from '../Notifications';
import MyButton from '../../../util/MyButton';

import './styles.scss';

const Navbar: React.FC = ({ authenticated }: any) => {
  return (
    <AppBar color="primary">
      <Toolbar className="nav-container">
        {authenticated ? (
          <>
            <PostPost />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <Notifications />
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Entrar
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Registrar
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: any): any => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
