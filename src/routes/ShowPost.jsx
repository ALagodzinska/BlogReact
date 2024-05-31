import { Button, Container, LinearProgress } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostHeader from "../components/postHeader.component";
import { fetchPost } from "../post.actions";
import { ALERT_MESSAGE_TYPE, POST_LOADING_ERROR } from "../constants";
import AlertMessage from "../components/alertMessage.component";

function ShowPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const [alertMessageOpen, setAlertMessageOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    setLoading(true);
    fetchPost(id)
      .then((post) => {
        setPost(post);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setAlertMessage({
          message: POST_LOADING_ERROR,
          type: ALERT_MESSAGE_TYPE.ERROR,
        });
        setAlertMessageOpen(true);
        console.error(error);
      });
  }, [id]);

  return (
    <Fragment>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        message={alertMessage.message}
        type={alertMessage.type}
      />
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
