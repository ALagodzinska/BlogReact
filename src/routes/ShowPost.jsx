import { Button, Box, Container, IconButton, LinearProgress } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostHeader from "../components/postHeader.component";
import { fetchPost } from "../post.actions";
import { ALERT_MESSAGE_TYPE, POST_LOADING_ERROR } from "../constants";
import AlertMessage from "../components/alertMessage.component";
import { useAlertMessage } from "../useAlertMessage";
import UndoIcon from "@mui/icons-material/Undo";

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
        <Container maxWidth="md" sx={{ mt: 3 }}>
          <Box>
            <IconButton component={Link} to="/posts">
              <UndoIcon />
            </IconButton>
            <PostHeader post={post} />
            <Box
              component="div"
              className="ql-editor"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.6,
                '& p': { margin: 0, padding: 0 },
                '& br': { display: 'inline', lineHeight: '1', margin: 0, padding: 0 },
                '& h1,& h2,& h3,& h4,& h5,& h6': { margin: 0, padding: 0 },
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {/*<ReactQuill value={post.content} readOnly={true} theme={"bubble"} /> - alternative*/}
          </Box>
        </Container>
      )}
    </Fragment>
  );
}

export default ShowPost;
