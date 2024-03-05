import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { getUserFromLocalStorage } from "../user.actions";
import { getBase64, createPost } from "../post.actions";
import PostForm from "../components/postForm.component";
import {
  BACKGROUND_IMG_ERROR_MESSAGE,
  CONTENT_ERROR_MESSAGE,
  FORM_TYPE,
  LOADING_STATES,
  PREVIEW_IMG_ERROR_MESSAGE,
  TITLE_ERROR_MESSAGE,
} from "../constants";

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
  const [inputFields, setInputFields] = useState({
    title: "",
    content: "",
    backgroundImg: null,
    previewImg: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(LOADING_STATES.none);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
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

    const backgroundImgString = await getBase64(inputFields.backgroundImg);
    const previewImgString = await getBase64(inputFields.previewImg);

    createPost(
      inputFields.title,
      inputFields.content,
      backgroundImgString,
      previewImgString,
      token
    )
      .then((postId) => {
        console.log(postId);
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

  return (
    <PostForm
      handleSubmit={handleSubmit}
      inputFields={inputFields}
      setInputFields={setInputFields}
      errors={errors}
      loading={loading}
      formType={FORM_TYPE.CREATE}
    />
  );
}

export default AddPost;
