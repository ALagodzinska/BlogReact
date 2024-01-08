import {
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header.component";

async function postNewBlog(title, content) {
  const response = await fetch("/api/blogpost/postblog", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      image: "image",
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

    if (title && content) {
      postNewBlog(title, content)
        .then((postId) => console.log(postId))
        .catch((error) => console.error(error));
      navigate("/");
    }
  };

  const backgroundSelectedHandler = (event) => {
    setSelectedBackgroundImg(null);
    setSelectedBackgroundImg(event.target.files[0]);
  };

  const clearBackgroundImgHandler = (event) => {
    event.preventDefault();
    document.getElementById("background-img").value = "";
    setSelectedBackgroundImg(null);
  };

  const previewSelectedHandler = (event) => {
    setSelectedPreviewImg(null);
    setSelectedPreviewImg(event.target.files[0]);
  };

  const clearPreviewImgHandler = (event) => {
    event.preventDefault();
    document.getElementById("preview-img").value = "";
    setSelectedPreviewImg(null);
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
            <Box>
              <Typography sx={{ pb: 2 }}>
                Background picture (500 x 1500)
              </Typography>
              <input
                type="file"
                id="background-img"
                onChange={backgroundSelectedHandler}
              />
              {selectedBackgroundImg && (
                <Box>
                  <Box sx={{ pt: 3 }}>
                    <img
                      alt="not found"
                      height={"250px"}
                      src={URL.createObjectURL(selectedBackgroundImg)}
                    />
                  </Box>
                  <button onClick={clearBackgroundImgHandler}>Remove</button>
                </Box>
              )}
            </Box>
            <Box>
              <Typography sx={{ pb: 2 }}>
                Preview picture (1500 x 500)
              </Typography>
              <input
                type="file"
                id="preview-img"
                onChange={previewSelectedHandler}
              />
              {selectedPreviewImg && (
                <Box>
                  <Box sx={{ pt: 3 }}>
                    <img
                      alt="not found"
                      height={"250px"}
                      src={URL.createObjectURL(selectedPreviewImg)}
                    />
                  </Box>
                  <button onClick={clearPreviewImgHandler}>Remove</button>
                </Box>
              )}
            </Box>
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
