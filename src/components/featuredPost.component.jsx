import { Box, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { truncate } from "../post.actions";

function FeaturedPost({ post }) {
  return (
    <Grid item xs={12} md={8} pb={3} mt={5}>
      <Stack direction="row">
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="caption" sx={{ fontStyle: "italic" }}>
            {new Date(post.creationDate).toLocaleDateString()}
          </Typography>
          <Typography variant="h4" gutterBottom mb={3}>
            {post.title}
          </Typography>
          <Box mr={4}>
            <div
              dangerouslySetInnerHTML={{
                __html: truncate(post.content, 350),
              }}
            ></div>
          </Box>
          <Box mt={4}>
            <Link to={`/${post.blogPostId}`}>Read More...</Link>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              width: "450px",
              height: "350px",
              outline: "5px solid black",
              textAlign: "center",
              borderRadius: "10%",
            }}
          >
            <img
              src={`/api/Image/PreviewImage?postId=${post.blogPostId}`}
              alt="preview"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                borderRadius: "10%",
              }}
            />
          </Box>
          <Typography
            variant="caption"
            sx={{
              fontStyle: "italic",
              display: "flex",
              float: "right",
              mt: 1,
            }}
          >
            {post.user}
          </Typography>
        </Box>
      </Stack>
    </Grid>
  );
}

export default FeaturedPost;
