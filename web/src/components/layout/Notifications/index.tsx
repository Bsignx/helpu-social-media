import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../../redux/actions/userActions';

const Notifications: React.FC = ({
  notifications,
  markNotificationsRead,
}: any) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event: any): void => {
    setAnchorEl(event.target);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const onMenuOpened = (): void => {
    const unreadNotificationsIds = notifications
      .filter((not: any) => !not.read)
      .map((not: any) => not.notificationId);
    markNotificationsRead(unreadNotificationsIds);
  };

  dayjs.extend(relativeTime);

  const notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((not: any) => {
        console.log(notifications);
        const verb = not.type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.read ? 'primary' : 'secondary';
        const icon =
          not.type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={not.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="primary"
              variant="body1"
              to={`/users/${not.recipient}`}
            >
              {not.sender}
{' '}
{verb}
              {' '}
              seu post
{time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>Você não tem notificações ainda</MenuItem>
    );
  return (
    <>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notifications && notifications.length > 0 ? (
            notifications.filter((not: any) => not.read === false).length >
            0 ? (
              <Badge
                badgeContent={
                  notifications.filter((not: any) => not.read === false).length
                }
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            ) : (
              <NotificationsIcon />
            )
          ) : (
            <NotificationsIcon />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
};

const mapStateToProps = (state: any): any => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications,
);
