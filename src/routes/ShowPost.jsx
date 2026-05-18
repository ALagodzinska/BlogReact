import { Box, Button, Container, LinearProgress } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostHeader from "../components/postHeader.component";
import {
  addLikeToLocalStorage,
  checkIfPostIsLiked,
  fetchPost,
  getLikesFromLocalStorage,
  increaseNumberOfLikes,
} from "../services/postService";
import { ALERT_MESSAGE_TYPE, POST_LOADING_ERROR } from "../utils/constants";
import AlertMessage from "../components/alertMessage.component";
import { useAlertMessage } from "../hooks/useAlertMessage";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import styles from "../styles/pages/showPost.styles";

function ShowPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [canLike, setCanLike] = useState(true);
  const [loading, setLoading] = useState(false);

  const [arrayOfLikedPosts, setArrayOfLikedPosts] = useState([]);

  const alertMsg = useAlertMessage();

  useEffect(() => {
    setLoading(true);
    fetchPost(id)
      .then((post) => {
        setPost(post);
        setLikes(post.likes);

        var arrayOfLikes = getLikesFromLocalStorage();
        var postIsLiked = checkIfPostIsLiked(arrayOfLikes, post.blogPostId);

        setArrayOfLikedPosts(arrayOfLikes);
        setCanLike(!postIsLiked);
      })
      .catch((error) => {
        alertMsg.openMessage({
          message: POST_LOADING_ERROR,
          type: ALERT_MESSAGE_TYPE.ERROR,
        });
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  async function incrementLikes() {
    let newNumOfLikes;
    if (post == null && !canLike) {
      return;
    }

    try {
      newNumOfLikes = await increaseNumberOfLikes(post.blogPostId);

      var updatedLikes = addLikeToLocalStorage(
        arrayOfLikedPosts,
        post.blogPostId,
      );
      setArrayOfLikedPosts(updatedLikes);
      setLikes(newNumOfLikes);
      setCanLike(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      <AlertMessage alertMessage={alertMsg} />
      {loading ? (
        <LinearProgress />
      ) : post ? (
        <Box sx={styles.pageWrap}>
          <Container maxWidth="md" sx={styles.container}>
            <PostHeader post={post} />
            <Container sx={styles.likeContainer}>
              <Button
                onClick={incrementLikes}
                disabled={!canLike}
                startIcon={
                  canLike ? (
                    <FavoriteBorderRoundedIcon sx={styles.likeIcon} />
                  ) : (
                    <FavoriteRoundedIcon sx={styles.likeIcon} />
                  )
                }
                sx={styles.likeButton}
              >
                {likes} {likes === 1 ? "Like" : "Likes"}
              </Button>
            </Container>

            <Box component="div" className="ql-editor" sx={styles.article}>
              <Box
                component="div"
                sx={styles.articleContent}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
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
      ) : null}
    </Fragment>
  );
}

export default ShowPost;
