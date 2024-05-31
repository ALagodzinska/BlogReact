import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost, getBase64, updatePost } from "../post.actions";
import {
  ALERT_MESSAGE_TYPE,
  BACKGROUND_IMG_ERROR_MESSAGE,
  CONTENT_ERROR_MESSAGE,
  EDIT_SUCCESSFUL_MESSAGE,
  FILE_UPLOAD_ERROR,
  FORM_SUBMISSION_ERROR,
  FORM_TYPE,
  POST_LOADING_ERROR,
  PREVIEW_IMG_ERROR_MESSAGE,
  TITLE_ERROR_MESSAGE,
} from "../constants";
import PostForm from "../components/postForm.component";
import { getUserFromLocalStorage, validateUser } from "../user.actions";
import UserContext from "../user.context";
import { LinearProgress } from "@mui/material";
import AlertMessage from "../components/alertMessage.component";
import { useAlertMessage } from "../useAlertMessage";
function EditPost() {
  const [, setUser] = useContext(UserContext);

  const { id } = useParams();
  const [inputFields, setInputFields] = useState({
    title: "",
    content: "",
    backgroundImg: null,
    previewImg: null,
    backgroundImgFormat: null,
    previewImgFormat: null,
    backgroundImgLink: null,
    previewImgLink: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const alertMsg = useAlertMessage();

  const navigate = useNavigate();

  const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.title.trim() === "") {
      errors.title = TITLE_ERROR_MESSAGE;
    }
    if (inputValues.content.trim() === "") {
      errors.content = CONTENT_ERROR_MESSAGE;
    }
    if (!inputValues.backgroundImgLink && !inputValues.backgroundImg) {
      errors.backgroundImg = BACKGROUND_IMG_ERROR_MESSAGE;
    }
    if (!inputValues.previewImgLink && !inputValues.previewImg) {
      errors.previewImg = PREVIEW_IMG_ERROR_MESSAGE;
    }
    return errors;
  };

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

    let backgroundImgString = null;
    let backgroundImgFormat = null;

    let previewImgString = null;
    let previewImgFormat = null;

    try {
      if (inputFields.backgroundImg) {
        backgroundImgString = await getBase64(inputFields.backgroundImg);
        backgroundImgFormat = inputFields.backgroundImg.type;
      }
      if (inputFields.previewImg) {
        previewImgString = await getBase64(inputFields.previewImg);
        previewImgFormat = inputFields.previewImg.type;
      }
    } catch (error) {
      setLoading(false);
      alertMsg.openMessage({
        message: FILE_UPLOAD_ERROR,
        type: ALERT_MESSAGE_TYPE.ERROR,
      });
      console.error(error);
      return;
    }

    try {
      await updatePost(
        id,
        inputFields.title,
        inputFields.content,
        backgroundImgString,
        previewImgString,
        backgroundImgFormat,
        previewImgFormat,
        token
      );
      alertMsg.openMessage({
        message: EDIT_SUCCESSFUL_MESSAGE,
        type: ALERT_MESSAGE_TYPE.SUCCESS,
      });
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      setLoading(false);
      alertMsg.openMessage({
        message: FORM_SUBMISSION_ERROR,
        type: ALERT_MESSAGE_TYPE.ERROR,
      });
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPost(id)
      .then((post) => {
        setInputFields({
          title: post.title,
          content: post.content,
          backgroundImg: null,
          previewImg: null,
          previewImgFormat: post.previewImgFormat,
          backgroundImgFormat: post.backgroundImgFormat,
          backgroundImgLink: `/api/Image/BackgroundImage?postId=${id}`,
          previewImgLink: `/api/Image/PreviewImage?postId=${id}`,
        });
        setLoading(false);
      })
      .catch((error) => {
        alertMsg.openMessage({
          message: POST_LOADING_ERROR,
          type: ALERT_MESSAGE_TYPE.ERROR,
        });
        console.error(error);
      });
  }, [id]);

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
        formType={FORM_TYPE.UPDATE}
      />
    </Fragment>
  );
}

export default EditPost;
