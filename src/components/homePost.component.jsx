import { Box, Button, Grid, Link, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useContext, useState } from "react";
import UserContext from "../user.context";
import DeletePopup from "./deletePopup.component";

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

function HomePost({ post, refreshPostsAction }) {
  const [user] = useContext(UserContext);
  const [openDelete, setOpenDelete] = useState(false);

  const openDeleteWindow = (event) => {
    event.preventDefault();
    setOpenDelete(true);
  };

  return (
    <Box>
      <DeletePopup
        open={openDelete}
        setOpen={setOpenDelete}
        postId={post.blogPostId}
        refreshPostsAction={refreshPostsAction}
      />
      <Grid item xs={12} md={8} pb={3}>
        <Stack direction="row">
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              {new Date(post.creationDate).toLocaleDateString()}
            </Typography>
            <br />
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              {post.user}
            </Typography>
            <div
              dangerouslySetInnerHTML={{ __html: truncate(post.content, 450) }}
            ></div>
            <Link href={post.blogPostId}>Read More...</Link>
            <Box>
              {user && <Link href={`/edit/${post.blogPostId}`}>Edit</Link>}
            </Box>
            <Box>
              {user && (
                <Link href={"#"} onClick={openDeleteWindow}>
                  Delete
                </Link>
              )}
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                width: "250px",
                height: "300px",
                outline: "5px solid black",
                textAlign: "center",
              }}
            >
              <img
                src={`/api/Image/PreviewImage?postId=${post.blogPostId}`}
                alt="preview"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </Box>
          </Box>
        </Stack>
      </Grid>
      <Divider />
    </Box>
  );
}

export default HomePost;
