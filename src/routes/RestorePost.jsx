import {
  Button,
  Container,
  IconButton,
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
import { useEffect, useState } from "react";
import { fetchDeletedPosts, fetchDeletedPostsPageCount } from "../post.actions";
import { getUserFromLocalStorage } from "../user.actions";
import RestoreIcon from "@mui/icons-material/Restore";

function RestorePost() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);
  const token = getUserFromLocalStorage().accessToken;

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const refreshPosts = () => {
    Promise.all([
      fetchDeletedPostsPageCount(token),
      fetchDeletedPosts(page, token),
    ]).then(([pageCount, posts]) => {
      setPosts(posts);
      console.log(pageCount);
      setPageCount(pageCount);
    });
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  useEffect(() => {
    fetchDeletedPosts(page, token).then((posts) => {
      setPosts(posts);
      console.log(posts);
    });
  }, [page]);

  return (
    <Container maxWidth="lg">
      <Header title="RESTORE POST" />
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
                  <IconButton>
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
