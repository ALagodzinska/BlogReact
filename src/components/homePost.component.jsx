import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import image from "../images/flowers.jpeg";
import image2 from "../images/defaultMainImg.jpg";

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

function HomePost({ post }) {
  return (
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
              src={Math.round(Math.random()) ? image : image2}
              alt="flower"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </Box>
        </Box>
      </Stack>
    </Grid>
  );
}

export default HomePost;
