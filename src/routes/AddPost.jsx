import { Button, Container, TextField, Typography, Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

async function postNewBlog(title, content) {
  const response = await fetch("/api/blogpost", {
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

  return (
    <Container>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h2" sx={{ py: 3, textAlign: "center" }}>
            Create New Post
          </Typography>
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
          <TextField
            id="title"
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
