import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getUserFromLocalStorage, validateUser } from "../user.actions";
import UserContext from "../user.context";
import { Alert, Box, CircularProgress } from "@mui/material";
import { deletePost } from "../post.actions";
import {
  ALERT_MESSAGE_TYPE,
  DELETE_ERROR,
  DELETE_SUCCESSFUL_MESSAGE,
} from "../constants";
import CheckIcon from "@mui/icons-material/Check";

export default function DeletePopup({
  open,
  setOpen,
  postId,
  refreshPostsAction,
}) {
  const [, setUser] = React.useContext(UserContext);

  const [loading, setLoading] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState({
    message: null,
    type: null,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const deleteRequest = (postId) => {
    setLoading(true);
    const token = getUserFromLocalStorage()?.accessToken;

    deletePost(postId, token)
      .then((postId) => {
        console.log(postId);
        setLoading(false);
        setAlertMessage({
          message: DELETE_SUCCESSFUL_MESSAGE,
          type: ALERT_MESSAGE_TYPE.SUCCESS,
        });
      })
      .then(
        setTimeout(() => {
          refreshPostsAction();
        }, 2500)
      )
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setAlertMessage({
          message: DELETE_ERROR,
          type: ALERT_MESSAGE_TYPE.ERROR,
        });
      });
  };

  const deletePostAction = () => {
    validateUser(setUser);
    deleteRequest(postId);
    // too fast whyyy
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
          {"This will DELETE this post permanently."}
          <br /> {`Are you sure you want to DELETE post with id - ${postId}?`}
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
          DELETE POST
        </DialogTitle>
        <DialogContent>{renderContent()}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading} autoFocus>
            {alertMessage.message != null ? "CLOSE" : "NO"}
          </Button>
          <Button
            onClick={() => {
              deletePostAction();
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
