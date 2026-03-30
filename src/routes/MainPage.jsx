import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Image from "../images/flowers.jpeg";
import SkeletonFeaturedPost from "../loading_components/skeleton_FeaturedPost.component";
import { Fragment, useEffect, useState } from "react";
import { useAlertMessage } from "../useAlertMessage";
import { fetchFeaturedPost, fetchLatestPosts } from "../post.actions";
import { getUserFromLocalStorage } from "../user.actions";
import { ALERT_MESSAGE_TYPE, POSTS_LIST_ERROR } from "../constants";
import FeaturedPost from "../components/featuredPost.component";
import RecentPosts from "../components/recentPosts.component";
import AlertMessage from "../components/alertMessage.component";

function MainPage() {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [latestPosts, setLatestPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  const alertMsg = useAlertMessage();

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchFeaturedPost(), fetchLatestPosts()])
      .then(([featuredPost, latestPosts]) => {
        setFeaturedPost(featuredPost);
        setLatestPosts(latestPosts);
      })
      .catch((error) => {
        alertMsg.openMessage({
          message: POSTS_LIST_ERROR,
          type: ALERT_MESSAGE_TYPE.ERROR,
        });
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      <AlertMessage alertMessage={alertMsg} />
      <Container maxWidth="md" sx={{ border: 1, mt: 2 }}>
        {loading && <SkeletonFeaturedPost />}
        {!loading && featuredPost && latestPosts && (
          <Fragment>
            <FeaturedPost post={featuredPost} />
            <RecentPosts posts={latestPosts} />
          </Fragment>
        )}
      </Container>
    </Fragment>
  );
}

export default MainPage;
