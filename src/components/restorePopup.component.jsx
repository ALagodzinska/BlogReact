import * as React from "react";

import { getUserFromLocalStorage, validateUser } from "../user.actions";
import UserContext from "../user.context";
import { restorePost } from "../post.actions";
import {
  ALERT_MESSAGE_TYPE,
  POPUP_TYPE,
  RESTORE_ERROR,
  RESTORE_SUCCESSFUL_MESSAGE,
} from "../constants";
import PopupBase from "./popupBase.component";

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

  const restorePostAction = () => {
    validateUser(setUser);
    restoreSelectedPost(postId);
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
      title={POPUP_TYPE.RESTORE}
      postId={postId}
      open={open}
      setOpen={setOpen}
      popupAction={restorePostAction}
    />
  );
}
