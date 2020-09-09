/* eslint-disable no-shadow */
import React from 'react';
import { WithStyles, withStyles } from '@material-ui/styles';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';
import { connect } from 'react-redux';
import { PostProps } from '../../../pages/Home';
import DeletePost from '../DeletePost';
import MyButton from '../../../util/MyButton';
import PostDialog from '../PostDialog';
import LikeButton from '../LikeButton';

import styles from './styles';

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
        <LikeButton postId={postId} />
        <span>{`${likeCount} likes`}</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{`${commentCount} comments`}</span>
        <PostDialog postId={postId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state: any): any => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
