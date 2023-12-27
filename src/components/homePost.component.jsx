import { Grid, Typography } from "@mui/material";

function HomePost({ post }) {
  return (
    <Grid item xs={12} md={8} pb={3}>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="caption" sx={{ fontStyle: "italic" }}>
        {new Date(post.creationDate).toLocaleDateString()}
      </Typography>
      <Typography variant="subtitle1">{post.content}</Typography>
    </Grid>
  );
}

export default HomePost;
