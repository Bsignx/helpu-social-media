import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import './styles.scss';

type CommentsProps = { comments?: any };

const Comments: React.FC<CommentsProps> = ({ comments }: any) => {
  return (
    <Grid container className="comments-container">
      {comments.map((comment: any, index: number) => {
        const { body, createdAt, userImage, userHandle } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img src={userImage} alt="comment" className="commentImage" />
                </Grid>
                <Grid item sm={9}>
                  <div className="commentData">
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className="invisibleSeparator" />
                    <Typography variant="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className="visibleSeparator" />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default Comments;
