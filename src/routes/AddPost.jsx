import {
  Button,
  Container,
  TextField,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../components/header.component";
import ImageInput from "../components/test_imageInput.component";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUserFromLocalStorage } from "../user.actions";
import { getBase64, postNewBlog } from "../post.actions";

const validateValues = (inputValues) => {
  let errors = {};
  if (inputValues.title.trim() === "") {
    errors.title = "Title is required";
  }
  if (inputValues.content.trim() === "") {
    errors.content = "Content is required";
  }
  if (!inputValues.backgroundImg) {
    errors.backgroundImg = "Background image is required";
  }
  if (!inputValues.previewImg) {
    errors.previewImg = "Preview image is required";
  }
  return errors;
};

const loadingStates = {
  none: 0,
  loading: 1,
  success: 2,
  failure: 3,
};

function AddPost() {
  const [inputFields, setInputFields] = useState({
    title: "",
    content: "",
    backgroundImg: null,
    previewImg: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(loadingStates.none);

  const handleTitleChange = (event) => {
    setInputFields({ ...inputFields, title: event.target.value });
    if (errors.title) delete errors.title;
  };

  const handleBackgroundImgChange = (img) => {
    setInputFields({ ...inputFields, backgroundImg: img });
    if (errors.backgroundImg) delete errors.backgroundImg;
  };

  const handlePreviewImgChange = (img) => {
    setInputFields({ ...inputFields, previewImg: img });
    if (errors.previewImg) delete errors.previewImg;
  };

  const handleContentChange = (content) => {
    setInputFields({ ...inputFields, content: content });
    if (errors.content) delete errors.content;
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(loadingStates.loading);
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

    postNewBlog(
      inputFields.title,
      inputFields.content,
      backgroundImgString,
      previewImgString,
      token
    )
      .then((postId) => {
        console.log(postId);
        setLoading(loadingStates.success);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        setLoading(loadingStates.failure);
        console.error(error);
      });
  };

  return (
    <Container>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Header title={"CREATE NEW POST"} />
          {loading === loadingStates.success && (
            <Typography color={"green"} align="center">
              Successfully submitted ✓
            </Typography>
          )}
          {loading === loadingStates.failure && (
            <Typography color={"red"} align="center">
              Failed to save the post X
            </Typography>
          )}
          <TextField
            id="title"
            sx={{ pb: 3 }}
            label="Blog Title"
            name="title"
            value={inputFields.title}
            onChange={handleTitleChange}
            error={errors.title && true}
            helperText={errors.title}
          />
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
            pb={2}
          >
            <ImageInput
              title="Background Image"
              setSelectedImage={handleBackgroundImgChange}
              error={errors.backgroundImg}
              selectedImage={inputFields.backgroundImg}
            />
            <ImageInput
              title="Preview Image"
              setSelectedImage={handlePreviewImgChange}
              error={errors.previewImg}
              selectedImage={inputFields.previewImg}
            />
          </Stack>
          <ReactQuill
            theme="snow"
            value={inputFields.content}
            onChange={handleContentChange}
          />
          {errors.content && (
            <Typography color="red" fontSize={12}>
              {errors.content}
            </Typography>
          )}
          <Button
            variant="outlined"
            sx={{ mt: 7 }}
            type="submit"
            disabled={loading === loadingStates.success}
          >
            SAVE
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default AddPost;
