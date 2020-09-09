import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import EditIcon from '@material-ui/icons/Edit';
// Redux
import { connect } from 'react-redux';

import { logoutUser, uploadImage } from '../../../redux/actions/userActions';
import EditDetails from '../EditDetails';

import './styles.scss';

const Profile: React.FC = ({
  user: {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated,
  },
  uploadImageProfile,
  logoutUserProfile,
}: any) => {
  const handleImageChange = (event: any): void => {
    const image: any = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    uploadImageProfile(formData);
  };

  const handleEditPicture = (): any => {
    const fileInput: any = document.getElementById('imageInput');
    fileInput.click();
  };

  const handleLogout = (): void => {
    logoutUserProfile();
  };

  const profileMarkup = !loading ? (
    authenticated ? (
      <Paper className="paper">
        <div className="profile">
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="imageInput"
              hidden
              onChange={handleImageChange}
            />
            <Tooltip title="Trocar foto de perfil" className="tooltip">
              <IconButton onClick={handleEditPicture} className="button">
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              {`@${handle}`}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <div className="detail-wrapper">
                <LocationOn color="primary" />
                <span>{location}</span>
                <hr />
              </div>
            )}
            {website && (
              <div className="detail-wrapper">
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {' '}
                  {website}
                </a>
                <hr />
              </div>
            )}
            <div className="detail-wrapper">
              <CalendarToday color="primary" />
              <span>
                {`Se juntou em ${dayjs(createdAt).format('MM/YYYY')}`}
              </span>
            </div>
            <div className="buttons-wrapper">
              <Tooltip title="Logout" placement="top">
                <IconButton onClick={handleLogout}>
                  <KeyboardReturn color="primary" />
                </IconButton>
              </Tooltip>
              <EditDetails />
            </div>
          </div>
        </div>
      </Paper>
    ) : (
      <Paper className="paper">
        <Typography variant="body2" align="center">
          Perfil não encontrado, por favor acesse novamente
        </Typography>
        <div className="buttons">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Entrar
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
          >
            Registrar
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>carregando...</p>
  );

  return profileMarkup;
};

const mapStateToProps = (state: any): any => ({
  user: state.user,
});

const mapActionsToProps = {
  logoutUserProfile: logoutUser,
  uploadImageProfile: uploadImage,
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
