import React, { useState, useEffect } from 'react';
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
import MyButton from '../../../util/MyButton';
import { postPost, clearErrors } from '../../../redux/actions/dataActions';

import './styles.scss';

const PostPost: React.FC = ({ UI, postPost, clearErrors }: any) => {
  const [state, setState] = useState({
    open: false,
    body: '',
    errors: {} as any,
  });

  const handleOpen = (): void => {
    setState({ ...state, open: true });
  };
  const handleClose = (): void => {
    clearErrors();
    setState({ ...state, open: false, errors: {} });
  };

  useEffect(() => {
    if (UI.errors !== null) {
      setState({
        ...state,
        errors: UI.errors,
      });
    }
    if (!UI.errors && !UI.loading) {
      setState({ ...state, body: '', open: false, errors: {} });
      handleClose();
    }
  }, [UI.errors, UI.loading]);

  const handleChange = (event: any): void => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event: any): void => {
    event.preventDefault();
    postPost({ body: state.body });
  };

  return (
    <>
      <MyButton onClick={handleOpen} tip="Crie um Post!">
        <AddIcon />
      </MyButton>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton tip="Close" onClick={handleClose} tipClassName="closeButton">
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
              error={!!state.errors.body}
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
                <CircularProgress size={30} className="progressSpinner" />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state: any): any => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postPost, clearErrors })(PostPost);
