import React, { Component, Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { postPost } from '../../redux/actions/dataActions';

import './styles.scss'

const PostPost: React.FC = ({ UI, postPost }: any) => {
  const [state, setState] = useState({
    open: false,
    body: '',
    errors: {} as any
  })

  useEffect(() => {
    if (UI.errors) {
      setState({
        ...state,
        errors: UI.errors
      });
    }
    if (!UI.errors && !UI.loading) {
      setState({ ...state, body: '' });
      handleClose();
    }
  }, [UI.errors])

  const handleOpen = () => {
    setState({ ...state, open: true });
  };
  const handleClose = () => {
    setState({ ...state, open: false, errors: {} });
  };
  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    postPost({ body: state.body });
  };

  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip="Crie um Post!">
        <AddIcon />
      </MyButton>
      <Dialog
        open={state.open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName="closeButton"
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Criei um novo Post!</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="POST!!"
              multiline
              rows="3"
              placeholder="Post at your fellow apes"
              error={state.errors.body ? true : false}
              helperText={state.errors.body}
              className="textField"
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submitButton"
              disabled={UI.loading}
            >
              Enviar
                {UI.loading && (
                <CircularProgress
                  size={30}
                  className="progressSpinner"
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}



const mapStateToProps = (state: any) => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postPost }
)(PostPost);
