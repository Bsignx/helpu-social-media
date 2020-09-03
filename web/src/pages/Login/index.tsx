import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { loginUser } from '../../redux/actions/userActions'

import logoImage from '../../assets/logo.png';

import './styles.scss';

interface LoginState {
  email: string;
  password: string;
  errors: any;
}

const Login: React.FC = ({ loginUser, UI }: any) => {
  const [state, setState] = useState<LoginState>({
    email: '',
    password: '',
    errors: {} as any,
  });

  useEffect(() => {
    setState({ ...state, errors: UI.errors })
  }, [UI.errors])


  const history = useHistory();

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    const userData = {
      email: state.email,
      password: state.password,
    };
    loginUser(userData, history);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  return (
    <Grid container className="form">
      <Grid item sm />
      <Grid item sm>
        <img src={logoImage} alt="Helpu" className="logoImage" />
        <Typography variant="body2" color="primary" className="pageTitle">
          Seu espaço de conhecimento compartilhado. Destinado a lhe ajudar
          aprimorar não só você, mas sim, todos nós.
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="E-mail"
            helperText={state.errors !== null ? state.errors.email : ''}
            error={state.errors !== null && !!state.errors.email}
            className="textField"
            value={state.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Senha"
            helperText={state.errors !== null ? state.errors.password : ''}
            error={state.errors !== null && !!state.errors.password}
            className="textField"
            value={state.password}
            onChange={handleChange}
            fullWidth
          />
          {state.errors !== null && state.errors.general && (
            <Typography variant="body2" className="customError">
              {state.errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="button"
            fullWidth
            disabled={UI.loading}
          >
            Entrar
            {UI.loading && (
              <CircularProgress
                size={30}
                color="secondary"
                className="progress"
              />
            )}
          </Button>
          <small>
            {`Não tem conta? Registre-se `}
            <Link to="/signup">clicando aqui</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};


export default connect(mapStateToProps, mapActionsToProps)(Login);
