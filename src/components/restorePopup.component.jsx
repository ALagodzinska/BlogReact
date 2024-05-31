import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getUserFromLocalStorage, validateUser } from "../user.actions";
import UserContext from "../user.context";
import { restorePost } from "../post.actions";
import {
  ALERT_MESSAGE_TYPE,
  RESTORE_ERROR,
  RESTORE_SUCCESSFUL_MESSAGE,
} from "../constants";
import { Alert, Box, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function RestorePopup({
  open,
  setOpen,
  postId,
  refreshPostsMethod,
}) {
  const [, setUser] = React.useContext(UserContext);

  const [loading, setLoading] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState({
    message: null,
    type: null,
  });

  const restoreSelectedPost = (postId) => {
    setLoading(true);
    const token = getUserFromLocalStorage()?.accessToken;

    restorePost(postId, token)
      .then((postId) => {
        setLoading(false);
        setAlertMessage({
          message: RESTORE_SUCCESSFUL_MESSAGE,
          type: ALERT_MESSAGE_TYPE.SUCCESS,
        });
        console.log(postId);
      })
      .then(
        setTimeout(() => {
          refreshPostsMethod();
        }, 2500)
      )
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setAlertMessage({
          message: RESTORE_ERROR,
          type: ALERT_MESSAGE_TYPE.ERROR,
        });
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const restorePostAction = () => {
    validateUser(setUser);
    restoreSelectedPost(postId);
    setTimeout(() => {
      setOpen(false);
      setAlertMessage({
        message: null,
        type: null,
      });
    }, 3000);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    } else if (alertMessage.message) {
      return (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity={alertMessage.type}
          align="center"
        >
          {alertMessage.message}
        </Alert>
      );
    } else
      return (
        <DialogContentText id="alert-dialog-description" align="center">
          {"This action will RESTORE this post."}
          <br /> {`Are you sure you want to RESTORE post with id - ${postId}?`}
        </DialogContentText>
      );
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
        <DialogContent>{renderContent()}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {alertMessage.message != null ? "CLOSE" : "NO"}
          </Button>
          <Button
            onClick={() => {
              restorePostAction();
            }}
            disabled={loading || alertMessage.message != null}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
