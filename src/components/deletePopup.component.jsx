import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getUserFromLocalStorage } from "../user.actions";
import { deletePost, fetchPageCount, fetchPosts } from "../post.actions";

export default function DeletePopup({ open, setOpen, postId, deletePost }) {
  const handleClose = () => {
    setOpen(false);
  };

  const deletePostAction = () => {
    deletePost(postId);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color={"red"} align="center">
          DELETE POST
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align="center">
            {"This will DELETE this post permanently."}
            <br /> {`Are you sure you want to DELETE post with id - ${postId}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            NO
          </Button>
          <Button
            onClick={() => {
              deletePostAction(postId);
            }}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
