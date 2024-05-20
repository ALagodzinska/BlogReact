import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { validateUser } from "../user.actions";
import UserContext from "../user.context";

export default function RestorePopup({ open, setOpen, postId, restorePost }) {
  const [, setUser] = React.useContext(UserContext);
  const handleClose = () => {
    setOpen(false);
  };

  const restorePostAction = () => {
    validateUser(setUser);
    restorePost(postId);
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
          RESTORE POST
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align="center">
            {"This action will RESTORE this post."}
            <br />{" "}
            {`Are you sure you want to RESTORE post with id - ${postId}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            NO
          </Button>
          <Button
            onClick={() => {
              restorePostAction();
            }}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
