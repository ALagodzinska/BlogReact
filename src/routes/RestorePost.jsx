import {
  Button,
  Container,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Header from "../components/header.component";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import {
  fetchDeletedPosts,
  fetchDeletedPostsPageCount,
  restorePost,
} from "../post.actions";
import { getUserFromLocalStorage } from "../user.actions";
import RestoreIcon from "@mui/icons-material/Restore";
import RestorePopup from "../components/restorePopup.component";
import Layout from "../Layout";

function RestorePost() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = getUserFromLocalStorage().accessToken;

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const refreshPosts = () => {
    Promise.all([
      fetchDeletedPostsPageCount(token),
      fetchDeletedPosts(page, token),
    ])
      .then(([pageCount, posts]) => {
        setPosts(posts);
        console.log(pageCount);
        setPageCount(pageCount);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    refreshPosts();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchDeletedPosts(page, token)
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
        console.log(posts);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [page]);

  const [openRestore, setOpenRestore] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openRestoreWindow = (event, postId) => {
    event.preventDefault();
    setSelectedPost(postId);
    setOpenRestore(true);
  };

  const restoreMethod = (postId) => {
    restorePost(postId, token)
      .then((postId) => {
        refreshPosts();
        console.log(postId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      {loading && <LinearProgress />}
      {selectedPost && (
        <RestorePopup
          open={openRestore}
          setOpen={setOpenRestore}
          postId={selectedPost}
          restorePost={restoreMethod}
        ></RestorePopup>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Created at</TableCell>
              <TableCell align="right">Deleted at</TableCell>
              <TableCell>Restore</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.blogPostId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {post.blogPostId}
                </TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell align="right">
                  {new Date(post.creationDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  {new Date(post.deletedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => {
                      openRestoreWindow(e, post.blogPostId);
                    }}
                  >
                    <RestoreIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <Button
        component={Link}
        to="/"
        color="secondary"
        size="medium"
        variant="outlined"
        sx={{ px: 5, ml: 5, my: 3 }}
      >
        Go Back
      </Button>
    </Container>
  );
}

export default RestorePost;
