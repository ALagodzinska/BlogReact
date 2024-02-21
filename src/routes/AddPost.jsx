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

function AddPost() {
  const [inputFields, setInputFields] = useState({
    title: "",
    content: "",
    backgroundImg: null,
    previewImg: null,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
    const localErrors = validateValues(inputFields);
    setErrors(localErrors);
    const isValid = Object.keys(localErrors).length === 0;
    if (isValid) {
      setSubmitted(true);
      finishSubmit();
    }
  };

  const finishSubmit = () => {
    const token = getUserFromLocalStorage().accessToken;
    Promise.all([
      getBase64(inputFields.backgroundImg),
      getBase64(inputFields.previewImg),
    ]).then((imgValues) => {
      postNewBlog(
        inputFields.title,
        inputFields.content,
        imgValues[0],
        imgValues[1],
        token
      )
        .then((postId) => {
          console.log(postId);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => console.error(error));
    });
  };

  return (
    <Container>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Header title={"CREATE NEW POST"} />
          {submitted && (
            <Typography color={"green"} align="center">
              Successfully submitted ✓
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
            disabled={submitted}
          >
            SAVE
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default AddPost;
