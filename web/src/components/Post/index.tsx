import React from 'react';
import { WithStyles, withStyles } from '@material-ui/styles';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';

import { PostProps } from '../../pages/Home';

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
}) => {
  dayjs.extend(relativeTime);
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
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Post);
