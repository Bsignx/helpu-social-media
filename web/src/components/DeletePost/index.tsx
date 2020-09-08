import React, { useState } from 'react';
import MyButton from '../../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deletePost } from '../../redux/actions/dataActions';


import './styles.scss'

interface DeletePostProps {
  postId?: string;
}

const DeletePost: React.FC<DeletePostProps> = ({ deletePost, postId }: any) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeletePost = () => {
    deletePost(postId);
    setOpen(false);
  };

    return (
      <>
        <MyButton
          tip="Deletar Post"
          onClick={handleOpen}
          btnClassName="deleteButton"
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Você tem certeza que quer deleter seu post?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDeletePost} color="secondary">
              Deletar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
}


export default connect(
  null,
  { deletePost }
)(DeletePost);
