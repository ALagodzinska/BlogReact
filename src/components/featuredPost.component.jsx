import { Box, Grid, Stack, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { truncate } from "../post.actions";
import styles from "../styles/components/featuredPost.styles";

function FeaturedPost({ post }) {
  const formattedDate = new Date(post.creationDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Grid item xs={12} md={8} pb={3} mt={5}>
      <Card elevation={4} sx={styles.card}>
        {/* Title row: centered across the card */}
  <Box sx={styles.titleBox}>
          <Typography variant="caption" sx={styles.dateText}>
            {formattedDate}
          </Typography>
          <Typography variant="h4" component="h2" sx={styles.title}>
            {post.title}
          </Typography>
        </Box>
        <Box sx={styles.mainGridBox}>
          <CardContent sx={styles.cardContent}>
            <Box sx={styles.contentBox} dangerouslySetInnerHTML={{ __html: truncate(post.content, 340) }} />

            <Stack direction="row" justifyContent="flex-start" alignItems="center" mt={3} spacing={2}>
              <Button variant="contained" component={Link} to={`/${post.blogPostId}`} sx={styles.button}>
                Read More
              </Button>
            </Stack>
          </CardContent>

          <Box sx={styles.imageBox}>
            <CardMedia component="img" image={`/api/Image/PreviewImage?postId=${post.blogPostId}`} alt={post.title} sx={styles.image} />

            <Box sx={styles.authorBadge}>{post.user}</Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}

export default FeaturedPost;
