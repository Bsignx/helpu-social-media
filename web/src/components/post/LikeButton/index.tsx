/* eslint-disable no-shadow */
import React from 'react';
import { Link } from 'react-router-dom';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import MyButton from '../../../util/MyButton';
import { likePost, unlikePost } from '../../../redux/actions/dataActions';

type LikeButtonProps = {
  postId?: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  user: { authenticated, likes },
  postId,
  likePost,
  unlikePost,
}: any) => {
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
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedPost() ? (
    <MyButton tip="Undo like" onClick={handleUnlikePost}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={handleLikePost}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
  return likeButton;
};

const mapStateToProps = (state: any): any => ({
  user: state.user,
});

const mapActionsToProps = {
  likePost,
  unlikePost,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
