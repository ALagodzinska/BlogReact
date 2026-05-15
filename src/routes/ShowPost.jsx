import { Box, Button, Container, LinearProgress } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostHeader from "../components/postHeader.component";
import { fetchPost } from "../services/postService";
import { ALERT_MESSAGE_TYPE, POST_LOADING_ERROR } from "../constants";
import AlertMessage from "../components/alertMessage.component";
import { useAlertMessage } from "../useAlertMessage";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import styles from "../styles/pages/showPost.styles";

function ShowPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const alertMsg = useAlertMessage();

  useEffect(() => {
    setLoading(true);
    fetchPost(id)
      .then((post) => {
        setPost(post);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alertMsg.openMessage({
          message: POST_LOADING_ERROR,
          type: ALERT_MESSAGE_TYPE.ERROR,
        });
        console.error(error);
      });
  }, [id]);

  return (
    <Fragment>
      <AlertMessage alertMessage={alertMsg} />
      {!post || loading ? (
        <LinearProgress />
      ) : (
        <Box sx={styles.pageWrap}>
          <Container maxWidth="md" sx={styles.container}>
            <PostHeader post={post} />
            <Box component="div" className="ql-editor" sx={styles.article}>
              <Box
                component="div"
                sx={styles.articleContent}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              {/*<ReactQuill value={post.content} readOnly={true} theme={"bubble"} /> - alternative*/}
            </Box>
            <Button
              component={Link}
              to="/posts"
              variant="outlined"
              startIcon={<KeyboardBackspaceRoundedIcon />}
              sx={styles.backButton}
            >
              Back to posts
            </Button>
          </Container>
        </Box>
      )}
    </Fragment>
  );
}

export default ShowPost;
