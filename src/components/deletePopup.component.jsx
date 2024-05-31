import * as React from "react";
import { getUserFromLocalStorage, validateUser } from "../user.actions";
import UserContext from "../user.context";
import { deletePost } from "../post.actions";
import {
  ALERT_MESSAGE_TYPE,
  DELETE_ERROR,
  DELETE_SUCCESSFUL_MESSAGE,
  POPUP_TYPE,
} from "../constants";
import PopupBase from "./popupBase.component";

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
    setTimeout(() => {
      setOpen(false);
      setAlertMessage({
        message: null,
        type: null,
      });
    }, 2500);
  };

  return (
    <PopupBase
      loading={loading}
      alertMessage={alertMessage}
      title={POPUP_TYPE.DELETE}
      postId={postId}
      open={open}
      setOpen={setOpen}
      popupAction={deletePostAction}
    />
  );
}
