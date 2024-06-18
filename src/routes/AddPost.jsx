import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { getUserFromLocalStorage, validateUser } from "../user.actions";
import { getBase64, createPost } from "../post.actions";
import PostForm from "../components/postForm.component";
import {
  ALERT_MESSAGE_TYPE,
  BACKGROUND_IMG_ERROR_MESSAGE,
  CONTENT_ERROR_MESSAGE,
  CREATE_SUCCESSFUL_MESSAGE,
  FILE_UPLOAD_ERROR,
  FORM_SUBMISSION_ERROR,
  FORM_TYPE,
  PREVIEW_IMG_ERROR_MESSAGE,
  TITLE_ERROR_MESSAGE,
} from "../constants";
import UserContext from "../user.context";
import { LinearProgress } from "@mui/material";
import AlertMessage from "../components/alertMessage.component";
import { useAlertMessage } from "../useAlertMessage";

const validateValues = (inputValues) => {
  let errors = {};
  if (inputValues.title.trim() === "") {
    errors.title = TITLE_ERROR_MESSAGE;
  }
  if (inputValues.content.trim() === "") {
    errors.content = CONTENT_ERROR_MESSAGE;
  }
  if (!inputValues.backgroundImg) {
    errors.backgroundImg = BACKGROUND_IMG_ERROR_MESSAGE;
  }
  if (!inputValues.previewImg) {
    errors.previewImg = PREVIEW_IMG_ERROR_MESSAGE;
  }
  return errors;
};

function AddPost() {
  const [, setUser] = useContext(UserContext);

  const [inputFields, setInputFields] = useState({
    title: "",
    content: "",
    backgroundImg: null,
    previewImg: null,
    backgroundImgPreview: null,
    previewImgPreview: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const alertMsg = useAlertMessage();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await validateUser(setUser);
    const localErrors = validateValues(inputFields);
    setErrors(localErrors);
    const isValid = Object.keys(localErrors).length === 0;
    if (isValid) {
      finishSubmit();
    }
  };

  const finishSubmit = async () => {
    const token = getUserFromLocalStorage()?.accessToken;
    const backgroundImgType = inputFields.backgroundImg.type;
    const previewImgType = inputFields.previewImg.type;
    let backgroundImgString;
    let previewImgString;
    try {
      backgroundImgString = await getBase64(inputFields.backgroundImg);
      previewImgString = await getBase64(inputFields.previewImg);
    } catch (error) {
      setLoading(false);
      alertMsg.openMessage({
        message: FILE_UPLOAD_ERROR,
        type: ALERT_MESSAGE_TYPE.ERROR,
      });
      console.error(error);
      return;
    }

    createPost(
      inputFields.title,
      inputFields.content,
      backgroundImgString,
      previewImgString,
      backgroundImgType,
      previewImgType,
      token
    )
      .then((postId) => {
        console.log(postId);
        alertMsg.openMessage({
          message: CREATE_SUCCESSFUL_MESSAGE,
          type: ALERT_MESSAGE_TYPE.SUCCESS,
        });
        setTimeout(() => {
          navigate("/posts");
        }, 2500);
      })
      .catch((error) => {
        setLoading(false);
        alertMsg.openMessage({
          message: FORM_SUBMISSION_ERROR,
          type: ALERT_MESSAGE_TYPE.ERROR,
        });
        console.error(error);
      });
  };

  return (
    <Fragment>
      {loading && <LinearProgress />}
      <AlertMessage alertMessage={alertMsg} />
      <PostForm
        handleSubmit={handleSubmit}
        inputFields={inputFields}
        setInputFields={setInputFields}
        errors={errors}
        loading={loading}
        formType={FORM_TYPE.CREATE}
      />
    </Fragment>
  );
}

export default AddPost;
