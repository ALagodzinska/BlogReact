import { Button, Container, LinearProgress } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/header.component";
import { Link, useParams } from "react-router-dom";
import PostHeader from "../components/postHeader.component";
import { fetchPost } from "../post.actions";
import Layout from "../Layout";

function ShowPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPost(id).then((post) => {
      setPost(post);
      setLoading(false);
    });
  }, [id]);

  return (
    <Fragment>
      {!post || loading ? (
        <LinearProgress />
      ) : (
        <Container maxWidth="lg" sx={{ mt: 3 }}>
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
      )}
    </Fragment>
  );
}

export default ShowPost;
