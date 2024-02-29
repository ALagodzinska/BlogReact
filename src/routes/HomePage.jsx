import React, { useContext, useEffect, useState } from "react";
import Header from "../components/header.component";
import { Button, Container, Pagination, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import HomePost from "../components/homePost.component";
import UserContext from "../user.context";
import { fetchPageCount, fetchPosts } from "../post.actions";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(null);
  const [user] = useContext(UserContext);
  const handlePageChange = (_, value) => {
    setPage(value);
  };

  useEffect(() => {
    Promise.all([fetchPageCount(), fetchPosts(1)]).then(
      ([pageCount, posts]) => {
        setPosts(posts);
        setPageCount(pageCount);
      }
    );
  }, []);

  useEffect(() => {
    fetchPosts(page).then((posts) => {
      setPosts(posts);
    });
  }, [page]);

  return (
    <Container maxWidth="lg">
      <Header title="BLOG" />
      <Stack justifyContent="flex-end" direction="row" py={3}>
        {user && (
          <Button component={Link} to="/add" color="primary" variant="outlined">
            CREATE NEW POST
          </Button>
        )}
      </Stack>
      <Stack spacing={2}>
        {posts.map((post) => (
          <HomePost key={post.blogPostId} post={post} />
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
