import React, { FormEvent, useState, ChangeEvent } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.scss';

const Signup: React.FC = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
    loading: false,
    errors: {} as any,
  });

  const history = useHistory();

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    setState({ ...state, loading: true });
    const newUserData = {
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      handle: state.handle,
    };

    api
      .post('/signup', newUserData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('FBIdToken', `Bearer ${res.data.userToken}`);
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
        <Typography variant="h4" color="primary" className="pageTitle">
          Cadastrar-se
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Digite a senha novamente"
            helperText={state.errors.confirmPassword}
            error={!!state.errors.confirmPassword}
            className="textField"
            value={state.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Apelido"
            helperText={state.errors.handle}
            error={!!state.errors.handle}
            className="textField"
            value={state.handle}
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
            Salvar
            {state.loading && (
              <CircularProgress
                size={30}
                color="secondary"
                className="progress"
              />
            )}
          </Button>
          <small>
            {`Já possui uma conta? Acesse `}
            <Link to="/login">clicando aqui</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Signup;
