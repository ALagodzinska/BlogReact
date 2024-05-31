import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Pagination,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomePost from "../components/homePost.component";
import UserContext from "../user.context";
import { deletePost, fetchPageCount, fetchPosts } from "../post.actions";
import { getUserFromLocalStorage } from "../user.actions";
import SkeletonHomePost from "../loading_components/skeleton_HomePost.component";
import {
  ALERT_MESSAGE_TYPE,
  DELETE_ERROR,
  DELETE_SUCCESSFUL_MESSAGE,
  POSTS_LIST_ERROR,
} from "../constants";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(null);
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const refreshPosts = () => {
    setLoading(true);
    Promise.all([fetchPageCount(), fetchPosts(page)])
      .then(([pageCount, posts]) => {
        setPosts(posts);
        setPageCount(pageCount);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setLoadingError(POSTS_LIST_ERROR);
        console.log(error);
      });
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPosts(page)
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setLoadingError(error);
        console.error("ERROR STATUS CODE", error);
      });
  }, [page]);

  return (
    <Container maxWidth="lg">
      <Stack justifyContent="flex-end" direction="row" py={3}>
        {user && (
          <Button component={Link} to="/add" color="primary" variant="outlined">
            CREATE NEW POST
          </Button>
        )}
      </Stack>
      {loadingError && (
        <Alert variant="outlined" severity="error">
          {loadingError}
        </Alert>
      )}
      <Stack spacing={2}>
        {(loading ? Array.from(new Array(5)) : posts).map((post, index) => (
          <Box key={index}>
            {post ? (
              <HomePost
                key={post.blogPostId}
                post={post}
                refreshPostsAction={refreshPosts}
              />
            ) : (
              <SkeletonHomePost />
            )}
          </Box>
        ))}
      </Stack>
      {pageCount && (
        <Pagination
          count={pageCount}
          onChange={handlePageChange}
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
          }}
        />
      )}
    </Container>
  );
}

export default HomePage;
