import { Box, Grid, Paper, Typography } from "@mui/material";

function PostHeader({ post }) {
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0)), url(/api/Image/BackgroundImage?postId=${post.blogPostId})`,
        height: 250,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.05)",
        }}
      />
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              sx={{ textShadow: "0 1px 0 black", textTransform: "uppercase" }}
            >
              {post.title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="caption"
            sx={{ fontStyle: "italic", paddingLeft: 2 }}
          >
            {post.user}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontStyle: "italic", paddingLeft: 2 }}
          >
            {new Date(post.creationDate).toLocaleDateString()}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PostHeader;
