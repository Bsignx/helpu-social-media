/* eslint-disable no-shadow */
import React from 'react';
import { WithStyles, withStyles } from '@material-ui/styles';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { connect } from 'react-redux';
import { PostProps } from '../../pages/Home';
import DeletePost from '../DeletePost';
import MyButton from '../../util/MyButton';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

import styles from './styles';
import PostDialog from '../PostDialog';

interface PostPropsComponent extends WithStyles<typeof styles> {
  post: PostProps;
}

const Post: React.FC<PostPropsComponent> = ({
  post: {
    body,
    createdAt,
    userImage,
    userHandle,
    postId,
    likeCount,
    commentCount,
  },
  classes,
  user: {
    authenticated,
    likes,
    credentials: { handle },
  },
  likePost,
  unlikePost,
}: any) => {
  dayjs.extend(relativeTime);

  const likedPost = (): any => {
    if (likes && likes.find((like: any) => like.postId === postId)) return true;
    return false;
  };
  const handleLikePost = (): any => {
    likePost(postId);
  };
  const handleUnlikePost = (): any => {
    unlikePost(postId);
  };

  const likeButton = !authenticated ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : likedPost() ? (
    <MyButton tip="Undo like" onClick={handleUnlikePost}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={handleLikePost}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeletePost postId={postId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          color="primary"
          component={Link}
          to={`/users/${userHandle}`}
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {likeButton}
        <span>
{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>
{commentCount} comments</span>
        <PostDialog postId={postId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state: any): any => ({
  user: state.user,
});

const mapActionsToProps = {
  likePost,
  unlikePost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(withStyles(styles)(Post));
