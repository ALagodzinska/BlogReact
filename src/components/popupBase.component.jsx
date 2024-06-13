import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Fragment } from "react";

function PopupBase({
  loading,
  alertMessage,
  title,
  postId,
  open,
  popupAction,
  setOpen,
}) {
  const handleClose = () => {
    setOpen(false);
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
          {`This action will ${title} this post.`}
          <br /> {`Are you sure you want to ${title} post with id - ${postId}?`}
        </DialogContentText>
      );
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color={"red"} align="center">
          {`${title} POST`}
        </DialogTitle>
        <DialogContent>{renderContent()}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {alertMessage.message != null ? "CLOSE" : "NO"}
          </Button>
          <Button
            onClick={() => {
              popupAction();
            }}
            disabled={loading || alertMessage.message != null}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default PopupBase;
