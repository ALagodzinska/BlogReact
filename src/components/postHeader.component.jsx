import { Box, Typography } from "@mui/material";
import styles from "../styles/components/postHeader.styles";

function PostHeader({ post }) {
  const formattedDate = new Date(post.creationDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Box
      sx={{
        ...styles.wrapper,
        backgroundImage: `url(/api/Image/BackgroundImage?postId=${post.blogPostId})`,
      }}
    >
      <Box sx={styles.overlay} />
      <Box sx={styles.content}>
        <Typography component="h1" variant="h2" sx={styles.title}>
          {post.title}
        </Typography>
        <Box sx={styles.metaRow}>
          <Box component="span" sx={styles.metaBadge}>
            {formattedDate}
          </Box>
        </Box>
      </Box>
      <Box component="span" sx={styles.authorBadge}>
        {post.user}
      </Box>
    </Box>
  );
}

export default PostHeader;
