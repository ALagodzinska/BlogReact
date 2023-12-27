import React, { useEffect, useState } from "react";
import Header from "../components/header.component";
import { Button, Container, Pagination, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import HomePost from "../components/homePost.component";

async function fetchPosts(pageNum) {
  const response = await fetch(`/api/blogpost/getpostsforpage?page=${pageNum}`);
  const json = await response.json();
  return json;
}

async function fetchPageCount() {
  const response = await fetch("/api/blogpost/getpagecount");
  const json = await response.json();
  return json;
}

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);
  const handlePageChange = (_, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchPageCount().then((count) => {
      setPageCount(count);
    });
  }, []);

  useEffect(() => {
    fetchPosts(page).then((postsPerPage) => {
      setPosts(postsPerPage);
    });
  }, [page]);

  return (
    <Container maxWidth="lg">
      <Header title="BLOG" />
      <Stack justifyContent="flex-end" direction="row" py={3}>
        <Button component={Link} to="/add" color="primary" variant="outlined">
          CREATE NEW POST
        </Button>
      </Stack>
      <Stack spacing={2}>
        {posts.map((post) => (
          <HomePost key={post.blogPostId} post={post} />
        ))}
      </Stack>
      <Pagination count={pageCount} onChange={handlePageChange} />
    </Container>
  );
}

export default HomePage;
