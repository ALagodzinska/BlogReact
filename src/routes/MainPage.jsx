import { Box, Container } from "@mui/material";
import SkeletonFeaturedPost from "../loading_components/skeleton_FeaturedPost.component";
import { Fragment, useEffect, useState } from "react";
import { useAlertMessage } from "../useAlertMessage";
import { fetchFeaturedPost, fetchLatestPosts } from "../post.actions";
import { ALERT_MESSAGE_TYPE, POSTS_LIST_ERROR } from "../constants";
import FeaturedPost from "../components/featuredPost.component";
import RecentPosts from "../components/recentPosts.component";
import AlertMessage from "../components/alertMessage.component";
import styles from "../styles/pages/mainPage.styles";

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
      <Box sx={styles.outer}>
        <Container maxWidth="md" sx={styles.container}>
          {loading && <SkeletonFeaturedPost />}
          {!loading && featuredPost && latestPosts && (
            <Fragment>
              <FeaturedPost post={featuredPost} />
              <RecentPosts posts={latestPosts} />
            </Fragment>
          )}
        </Container>
      </Box>
    </Fragment>
  );
}

export default MainPage;
