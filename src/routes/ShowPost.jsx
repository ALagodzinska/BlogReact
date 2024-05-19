import { Button, Container, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../components/header.component";
import { Link, useParams } from "react-router-dom";
import PostHeader from "../components/postHeader.component";
import { fetchPost } from "../post.actions";

function ShowPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost(id).then(setPost);
  }, [id]);

  if (!post) {
    return <LinearProgress />;
  }

  return (
    <Container maxWidth="lg">
      <Header title="BLOG" />
      <Container>
        <PostHeader post={post} />
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        {/*<ReactQuill value={post.content} readOnly={true} theme={"bubble"} /> - alternative*/}
      </Container>
      <Button
        component={Link}
        to="/"
        color="secondary"
        size="medium"
        variant="outlined"
        sx={{ px: 5, ml: 5, my: 3 }}
      >
        Go Back
      </Button>
    </Container>
  );
}

export default ShowPost;
