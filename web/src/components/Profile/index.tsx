import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
// Redux
import { connect } from 'react-redux';

import './styles.scss';

const Profile: React.FC = ({
  classes,
  user: {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated,
  },
}: any) => {
  const profileMarkup = !loading ? (
    authenticated ? (
      <Paper className="paper">
        <div className="profile">
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
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

export default connect(mapStateToProps)(Profile);
