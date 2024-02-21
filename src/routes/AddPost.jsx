import { Button, Container, TextField, Stack, Box } from "@mui/material";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../components/header.component";
import ImageInput from "../components/test_imageInput.component";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUserFromLocalStorage } from "../user.actions";
import { getBase64, postNewBlog } from "../post.actions";

function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedBackgroundImg, setSelectedBackgroundImg] = useState(null);
  const [selectedPreviewImg, setSelectedPreviewImg] = useState(null);

  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [previewImgError, setPreviewImgError] = useState(false);
  const [backgroundImgError, setBackgroundImgError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTitleError(false);
    setContentError(false);

    if (title.trim() === "") {
      setTitleError(true);
    }
    if (content.trim() === "") {
      setContentError(true);
    }
    if (!selectedBackgroundImg) {
      setBackgroundImgError(true);
    }
    if (!selectedPreviewImg) {
      setPreviewImgError(true);
    }

    const token = getUserFromLocalStorage().accessToken;

    if (title && content && selectedBackgroundImg && selectedPreviewImg) {
      Promise.all([
        getBase64(selectedBackgroundImg),
        getBase64(selectedPreviewImg),
      ]).then((values) => {
        console.log(values);
        postNewBlog(title, content, values[0], values[1], token)
          .then((postId) => {
            console.log(postId);
            navigate("/");
          })
          .catch((error) => console.error(error));
      });
    }
  };

  return (
    <Container>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Header title={"CREATE NEW POST"} />
          <TextField
            id="title"
            sx={{ pb: 3 }}
            label="Blog Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
            error={titleError}
            helperText={titleError ? "This field is required" : ""}
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
              onImageChange={(img) => {
                setSelectedBackgroundImg(img);
              }}
              error={backgroundImgError}
            />
            <ImageInput
              title="Preview Image"
              onImageChange={(img) => {
                setSelectedPreviewImg(img);
              }}
              error={previewImgError}
            />
          </Stack>
          <TextField
            id="content"
            sx={{ pb: 3 }}
            label="Content"
            multiline
            rows={10}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setContentError(false);
            }}
            error={contentError}
            helperText={contentError ? "This field is required" : ""}
          />
          <ReactQuill theme="snow" value={content} onChange={setContent} />
          <Button variant="outlined" sx={{ mt: 7 }} type="submit">
            SAVE
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default AddPost;
