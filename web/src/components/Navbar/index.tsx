import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import './styles.scss';

const Navbar: React.FC = () => {
  return (
    <AppBar color="primary">
      <Toolbar className="nav-container">
        <Button color="inherit" component={Link} to="/login">
          Entrar
        </Button>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          Registrar
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
