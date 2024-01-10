import { Button, Container, TextField, Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header.component";
import ImageInput from "../components/test_imageInput.component";

async function postNewBlog(title, content, backgroundImage, previewImage) {
  const response = await fetch("/api/blogpost/postblog", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      backgroundImage,
      previewImage,
      user: "user",
    }),
  });
  return await response.json();
}

function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [selectedBackgroundImg, setSelectedBackgroundImg] = useState(null);
  const [selectedPreviewImg, setSelectedPreviewImg] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    setTitleError(false);
    setContentError(false);

    if (title.trim() === "") {
      setTitleError(true);
    }
    if (content.trim() === "") {
      setContentError(true);
    }

    const backroundImgUrl = window.URL.createObjectURL(
      new Blob([selectedBackgroundImg])
    );
    const previewImageUrl = window.URL.createObjectURL(
      new Blob([selectedPreviewImg])
    );

    if (title && content) {
      postNewBlog(title, content, backroundImgUrl, previewImageUrl)
        .then((postId) => console.log(postId))
        .catch((error) => console.error(error));
      navigate("/");
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
            />
            <ImageInput
              title="Preview Image"
              onImageChange={(img) => {
                setSelectedPreviewImg(img);
              }}
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
          <Button variant="outlined" sx={{ my: 3 }} type="submit">
            SAVE
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default AddPost;
