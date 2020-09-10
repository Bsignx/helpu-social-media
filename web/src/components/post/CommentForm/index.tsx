/* eslint-disable no-shadow */
import React, { Component, useState, useEffect } from 'react';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { connect } from 'react-redux';
import { submitComment } from '../../../redux/actions/dataActions';

type CommentFormProps = { postId: string };

const CommentForm: React.FC<CommentFormProps> = ({
  authenticated,
  UI,
  submitComment,
  postId,
}: any) => {
  const [state, setState] = useState({
    body: '',
    errors: '' as any,
  });

  useEffect(() => {
    if (UI.errors) {
      setState({ ...state, errors: UI.errors });
    }
    if (UI.errors === null) {
      setState({ errors: '', body: '' });
    }
  }, [UI.errors, UI]);

  const handleChange = (event: any): void => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event: any): void => {
    event.preventDefault();
    submitComment(postId, { body: state.body });
  };

  const { errors } = state;

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on post"
          error={!!errors && errors !== null}
          helperText={errors}
          value={state.body}
          onChange={handleChange}
          fullWidth
          className="textField"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="button"
        >
          Enviar
        </Button>
      </form>
      <hr className="visibleSeparator" />
    </Grid>
  ) : null;
  return commentFormMarkup;
};

const mapStateToProps = (state: any): any => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(CommentForm);
