import { Box, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../styles/components/recentPosts.styles";

function RecentPosts({ posts }) {
  return (
    <Box sx={styles.container}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={styles.headerRow}>
        <Typography variant="h6" sx={styles.headerTitle}>
          Latest Posts
        </Typography>
        <Button component={Link} to="/posts" variant="contained" size="small" sx={styles.headerButton}>
          See All
        </Button>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={styles.listRow}>
        {posts.map((post) => (
          <Stack key={post.blogPostId} component={Link} to={`/${post.blogPostId}`} p={0} sx={styles.card}>
            <Box sx={styles.imageBox}>
              <img src={`/api/Image/PreviewImage?postId=${post.blogPostId}`} alt="preview" style={styles.image} />
            </Box>

            <Box sx={styles.titleBox}>
              <Typography variant="subtitle1" sx={styles.title}>
                {post.title}
              </Typography>
            </Box>

            <Box sx={styles.dateBox}>
              <Typography variant="caption" sx={styles.dateText}>
                {new Date(post.creationDate).toLocaleDateString()}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default RecentPosts;
