import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

function HomePost({ post }) {
  return (
    <Box>
      <Grid item xs={12} md={8} pb={3}>
        <Stack direction="row">
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              {new Date(post.creationDate).toLocaleDateString()}
            </Typography>
            <div
              dangerouslySetInnerHTML={{ __html: truncate(post.content, 450) }}
            ></div>
            <Link href={post.blogPostId}>Read More...</Link>
          </Box>
          <Box>
            <Box
              sx={{
                width: "250px",
                height: "300px",
                border: "5px solid black",
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
