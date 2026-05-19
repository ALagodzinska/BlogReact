import {
  Box,
  Button,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostHeader from "../components/postHeader.component";
import {
  addLikeToLocalStorage,
  addViewsToLocalStorage,
  checkIfPostIsLiked,
  checkIfPostIsViewed,
  fetchPost,
  getLikesFromLocalStorage,
  getViewsFromLocalStorage,
  increaseNumberOfLikes,
  incrementNumberOfViews,
  removeViewFromLocalStorage,
} from "../services/postService";
import { ALERT_MESSAGE_TYPE, POST_LOADING_ERROR } from "../utils/constants";
import AlertMessage from "../components/alertMessage.component";
import { useAlertMessage } from "../hooks/useAlertMessage";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import styles from "../styles/pages/showPost.styles";

function ShowPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [canLike, setCanLike] = useState(true);
  const [loading, setLoading] = useState(false);

  const [arrayOfLikedPosts, setArrayOfLikedPosts] = useState([]);

  const alertMsg = useAlertMessage();

  const updateLikeState = (loadedPost) => {
    const likedPostIds = getLikesFromLocalStorage();
    const postIsLiked = checkIfPostIsLiked(likedPostIds, loadedPost.blogPostId);

    setLikes(loadedPost.likes);
    setArrayOfLikedPosts(likedPostIds);
    setCanLike(!postIsLiked);
  };

  const updateViewState = async (loadedPost) => {
    const viewedPostIds = getViewsFromLocalStorage();
    const postIsViewed = checkIfPostIsViewed(
      viewedPostIds,
      loadedPost.blogPostId,
    );

    if (postIsViewed) {
      setViews(loadedPost.views);
      return;
    }

    addViewsToLocalStorage(viewedPostIds, loadedPost.blogPostId);

    try {
      const updatedNumOfViews = await incrementNumberOfViews(
        loadedPost.blogPostId,
      );
      setViews(updatedNumOfViews);
    } catch (error) {
      removeViewFromLocalStorage(loadedPost.blogPostId);
      console.error("Error updating views:", error);
    }
  };

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);

      try {
        const loadedPost = await fetchPost(id);

        setPost(loadedPost);
        updateLikeState(loadedPost);
        await updateViewState(loadedPost);
      } catch (error) {
        alertMsg.openMessage({
          message: POST_LOADING_ERROR,
          type: ALERT_MESSAGE_TYPE.ERROR,
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
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
            <Box sx={styles.postActions}>
              <Button
                component={Link}
                to="/posts"
                variant="outlined"
                startIcon={<KeyboardBackspaceRoundedIcon />}
                sx={styles.backButton}
              >
                Back to posts
              </Button>
              <Box sx={styles.viewsWrap}>
                <Box sx={styles.viewsBadge}>
                  <VisibilityRoundedIcon sx={styles.viewsIcon} />
                  <Typography component="span" sx={styles.viewsNumber}>
                    {views}
                  </Typography>
                  <Typography component="span" sx={styles.viewsLabel}>
                    {views === 1 ? "view" : "views"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      ) : null}
    </Fragment>
  );
}

export default ShowPost;
