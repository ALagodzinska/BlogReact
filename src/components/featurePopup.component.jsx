import { useContext, useState } from "react";
import UserContext from "../user.context";
import PopupBase from "./popupBase.component";
import {
  ALERT_MESSAGE_TYPE,
  FEATURE_ERROR,
  FEATURE_SUCCESSFUL_MESSAGE,
  POPUP_TYPE,
} from "../constants";
import { getUserFromLocalStorage, validateUser } from "../user.actions";
import { featurePost } from "../post.actions";

export default function FeaturePopup({
  open,
  setOpen,
  postId,
  refreshPostsAction,
}) {
  const [, setUser] = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: null,
    type: null,
  });

  const featureRequest = (postId) => {
    setLoading(true);
    const token = getUserFromLocalStorage()?.accessToken;

    featurePost(postId, token)
      .then((postId) => {
        console.log(postId);
        setLoading(false);
        setAlertMessage({
          message: FEATURE_SUCCESSFUL_MESSAGE,
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
          message: FEATURE_ERROR,
          type: ALERT_MESSAGE_TYPE.ERROR,
        });
      });
  };

  const featurePostAction = () => {
    validateUser(setUser);
    featureRequest(postId);
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
      title={POPUP_TYPE.FEATURE}
      postId={postId}
      open={open}
      setOpen={setOpen}
      popupAction={featurePostAction}
    />
  );
}
