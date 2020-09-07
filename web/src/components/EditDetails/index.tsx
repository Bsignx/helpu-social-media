/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
// Redux stuff
import { connect } from 'react-redux';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import MyButton from '../../util/MyButton';
import { editUserDetails } from '../../redux/actions/userActions';

import './styles.scss';

const EditDetails: React.FC = ({ credentials, editUserDetails }: any) => {
  const [state, setState] = useState({
    bio: '',
    website: '',
    location: '',
    open: false,
  });

  const mapUserDetailsToState = (userCredentials: any): void => {
    setState({
      ...state,
      bio: userCredentials.bio ? userCredentials.bio : '',
      website: userCredentials.website ? userCredentials.website : '',
      location: userCredentials.location ? userCredentials.location : '',
    });
  };

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, []);

  const handleOpen = (): void => {
    mapUserDetailsToState(credentials);
    setState({ ...state, open: !state.open });
  };
  const handleClose = (): void => {
    setState({ ...state, open: false });
  };

  const handleChange = (event: any): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (): void => {
    const userDetails = {
      bio: state.bio,
      website: state.website,
      location: state.location,
    };
    editUserDetails(userDetails);
    handleClose();
  };

  return (
    <>
      <MyButton
        tip="Editar detalhes"
        onClick={handleOpen}
        btnClassName="icon-button"
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edite seus detalhes</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className="textField"
              value={state.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professinal website"
              className="textField"
              value={state.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className="textField"
              value={state.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state: any): any => ({
  credentials: state.user.credentials,
});

const mapActionsToProps = {
  editUserDetails,
};

export default connect(mapStateToProps, mapActionsToProps)(EditDetails);
