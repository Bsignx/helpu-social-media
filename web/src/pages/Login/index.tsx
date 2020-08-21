import React, { FormEvent, useState, ChangeEvent } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';

import { useHistory, Link } from 'react-router-dom';

import logoImage from '../../assets/logo.png';
import api from '../../services/api';

import './styles.scss';

interface LoginState {
  email: string;
  password: string;
  loading: boolean;
  errors: any;
}

const Login: React.FC = () => {
  const [state, setState] = useState<LoginState>({
    email: '',
    password: '',
    loading: false,
    errors: {} as any,
  });

  const history = useHistory();

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    setState({ ...state, loading: true });
    const userData = {
      email: state.email,
      password: state.password,
    };

    api
      .post('/login', userData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        setState({
          ...state,
          loading: false,
        });
        history.push('/');
      })
      .catch(err => {
        setState({
          ...state,
          errors: err.response.data.errors
            ? err.response.data.errors
            : err.response.data,
          loading: false,
        });
      });
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
            helperText={state.errors.email}
            error={!!state.errors.email}
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
            helperText={state.errors.password}
            error={!!state.errors.password}
            className="textField"
            value={state.password}
            onChange={handleChange}
            fullWidth
          />
          {state.errors.general && (
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
            disabled={state.loading}
          >
            Entrar
            {state.loading && (
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

export default Login;
