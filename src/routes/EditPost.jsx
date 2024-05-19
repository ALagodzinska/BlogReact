import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchPost, getBase64, updatePost } from "../post.actions";
import {
  BACKGROUND_IMG_ERROR_MESSAGE,
  CONTENT_ERROR_MESSAGE,
  FORM_TYPE,
  LOADING_STATES,
  PREVIEW_IMG_ERROR_MESSAGE,
  TITLE_ERROR_MESSAGE,
} from "../constants";
import { Box, Container } from "@mui/material";
import PostForm from "../components/postForm.component";
import { getUserFromLocalStorage, validateUser } from "../user.actions";
import UserContext from "../user.context";

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
  const [loading, setLoading] = useState(LOADING_STATES.none);

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
    await validateUser(setUser);
    setLoading(LOADING_STATES.loading);
    const localErrors = validateValues(inputFields);
    setErrors(localErrors);
    const isValid = Object.keys(localErrors).length === 0;
    if (isValid) {
      finishSubmit();
    }
  };

  const finishSubmit = async () => {
    const token = getUserFromLocalStorage().accessToken;

    let backgroundImgString = null;
    let backgroundImgFormat = null;
    if (inputFields.backgroundImg) {
      backgroundImgString = await getBase64(inputFields.backgroundImg);
      backgroundImgFormat = inputFields.backgroundImg.type;
    }
    let previewImgString = null;
    let previewImgFormat = null;
    if (inputFields.previewImg) {
      previewImgString = await getBase64(inputFields.previewImg);
      previewImgFormat = inputFields.previewImg.type;
    }

    updatePost(
      id,
      inputFields.title,
      inputFields.content,
      backgroundImgString,
      previewImgString,
      backgroundImgFormat,
      previewImgFormat,
      token
    )
      .then(() => {
        setLoading(LOADING_STATES.success);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        setLoading(LOADING_STATES.failure);
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPost(id).then((post) => {
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
    });
  }, [id]);

  return (
    <PostForm
      handleSubmit={handleSubmit}
      inputFields={inputFields}
      setInputFields={setInputFields}
      errors={errors}
      loading={loading}
      formType={FORM_TYPE.UPDATE}
    />
  );
}

export default EditPost;
