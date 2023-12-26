import React, { useEffect, useState } from "react";
import Header from "../components/header.component";
import { Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import HomePost from "../components/homePost.component";

async function fetchPosts() {
  const response = await fetch("/api/blogpost");
  const json = await response.json();
  return json;
}

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then((blogPosts) => {
      console.log(blogPosts);
      setPosts(blogPosts);
    });
  }, []);

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
    </Container>
  );
}

export default HomePage;
