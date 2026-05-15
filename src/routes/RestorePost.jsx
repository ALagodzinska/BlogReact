import {
  Box,
  Button,
  Container,
  LinearProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  fetchDeletedPosts,
  fetchDeletedPostsPageCount,
} from "../services/postService";
import { getUserFromLocalStorage } from "../services/userService";
import RestoreIcon from "@mui/icons-material/Restore";
import RestorePopup from "../components/popups/restorePopup.component";
import styles from "../styles/pages/restorePost.styles";

function RestorePost() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = getUserFromLocalStorage()?.accessToken;

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

  return (
    <Container maxWidth="md" sx={styles.pageContainer}>
      {loading && <LinearProgress />}
      {selectedPost && (
        <RestorePopup
          open={openRestore}
          setOpen={setOpenRestore}
          postId={selectedPost}
          refreshPostsMethod={refreshPosts}
        ></RestorePopup>
      )}
      <Paper sx={styles.shell}>
        <Stack sx={styles.headerRow}>
          <Typography sx={styles.title}>Restore Deleted Posts</Typography>
          <Typography sx={styles.subtitle}>
            Review removed posts and restore anything back to your active list.
          </Typography>
        </Stack>

        <TableContainer component={Box} sx={styles.tableContainer}>
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="deleted posts table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={styles.tableHeadCell}>ID</TableCell>
                <TableCell sx={styles.tableHeadCell}>Title</TableCell>
                <TableCell align="right" sx={styles.tableHeadCell}>
                  Created
                </TableCell>
                <TableCell align="right" sx={styles.tableHeadCell}>
                  Deleted
                </TableCell>
                <TableCell align="center" sx={styles.tableHeadCell}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={5} sx={styles.emptyState}>
                    No deleted posts found.
                  </TableCell>
                </TableRow>
              )}
              {posts.map((post) => (
                <TableRow key={post.blogPostId} sx={styles.tableRow}>
                  <TableCell component="th" scope="row" sx={styles.idCell}>
                    {post.blogPostId}
                  </TableCell>
                  <TableCell sx={styles.titleCell}>{post.title}</TableCell>
                  <TableCell align="right">
                    {new Date(post.creationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(post.deletedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      startIcon={<RestoreIcon />}
                      sx={styles.restoreButton}
                      onClick={(e) => {
                        openRestoreWindow(e, post.blogPostId);
                      }}
                    >
                      Restore
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {pageCount > 0 && (
        <Pagination
          count={pageCount}
          onChange={handlePageChange}
          sx={styles.pagination}
        />
      )}
    </Container>
  );
}

export default RestorePost;
