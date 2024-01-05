import { Grid, Link, Typography } from "@mui/material";

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

function HomePost({ post }) {
  return (
    <Grid item xs={12} md={8} pb={3}>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="caption" sx={{ fontStyle: "italic" }}>
        {new Date(post.creationDate).toLocaleDateString()}
      </Typography>
      <Typography variant="subtitle1">{truncate(post.content, 450)}</Typography>
      <Link href={post.blogPostId}>Read More...</Link>
    </Grid>
  );
}

export default HomePost;
