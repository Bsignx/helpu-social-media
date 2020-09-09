/* eslint-disable no-shadow */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux stuff
import { connect } from 'react-redux';
import LikeButton from '../LikeButton';
import MyButton from '../../util/MyButton';
import { getPost } from '../../redux/actions/dataActions';

import './styles.scss';

interface PostDialogProps {
  postId?: string;
  userHandle?: string;
}

const PostDialog: React.FC<PostDialogProps> = ({
  post: { body, createdAt, likeCount, commentCount, userImage, userHandle },
  postId,
  UI: { loading },
  getPost,
}: any) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(true);
    getPost(postId);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  const dialogMarkup = loading ? (
    <div className="spinnerDiv">
      <CircularProgress size={150} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={10}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className="profileImage" />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          {`@${userHandle}`}
        </Typography>
        <hr className="invisibleSeparator" />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className="invisibleSeparator" />
        <Typography variant="body1">{body}</Typography>
        <LikeButton postId={postId} />
        <span>{`${likeCount} likes`}</span>
        <MyButton tip="comentários">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{`${commentCount} commentários`}</span>
      </Grid>
    </Grid>
  );
  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip="Expand post"
        tipClassName="expandButton"
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton tip="Close" onClick={handleClose} tipClassName="closeButton">
          <CloseIcon />
        </MyButton>
        <DialogContent className="dialogContent">{dialogMarkup}</DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state: any): any => ({
  post: state.data.post,
  UI: state.UI,
});

const mapActionsToProps = {
  getPost,
};

export default connect(mapStateToProps, mapActionsToProps)(PostDialog);
