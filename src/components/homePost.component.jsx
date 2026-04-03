import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../user.context";
import DeletePopup from "./deletePopup.component";
import { truncate } from "../post.actions";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import FeaturePopup from "./featurePopup.component";
import styles from "../styles/components/homePost.styles";

function HomePost({ post, refreshPostsAction }) {
  const [user] = useContext(UserContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [openFeaturePopup, setOpenFeaturePopup] = useState(false);

  const openDeleteWindow = (event) => {
    event.preventDefault();
    setOpenDelete(true);
  };

  const openFeatureWindow = (event) => {
    event.preventDefault();
    setOpenFeaturePopup(true);
  };

  const formattedDate = new Date(post.creationDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Box>
      <FeaturePopup
        open={openFeaturePopup}
        setOpen={setOpenFeaturePopup}
        postId={post.blogPostId}
        refreshPostsAction={refreshPostsAction}
      />
      <DeletePopup
        open={openDelete}
        setOpen={setOpenDelete}
        postId={post.blogPostId}
        refreshPostsAction={refreshPostsAction}
      />
      <Grid item xs={12} md={8} sx={styles.gridItem}>
        <Stack sx={styles.cardStack}>
          <Box sx={styles.contentContainer}>
            <Typography variant="h4" gutterBottom sx={styles.title}>
              {post.title}
            </Typography>
            <Typography variant="caption" sx={styles.date}>
              {formattedDate}
            </Typography>
            <Box
              component="div"
              sx={styles.postPreview}
              dangerouslySetInnerHTML={{ __html: truncate(post.content, 400) }}
            />
            <Stack direction="row" alignItems="center" spacing={1.5} sx={styles.actionRow}>
              <Button
                variant="contained"
                component={Link}
                to={`/${post.blogPostId}`}
                sx={styles.readMoreButton}
              >
                Read More
              </Button>
              {user && (
                <Button component={Link} to={`/edit/${post.blogPostId}`} variant="text" sx={styles.actionButton}>
                  Edit
                </Button>
              )}
              {user && (
                <Button variant="text" onClick={openDeleteWindow} sx={styles.deleteButton}>
                  Delete
                </Button>
              )}
            </Stack>
          </Box>
          <Box sx={styles.imageColumn}>
            <Box sx={styles.imageFrame}>
              <Box
                component="img"
                src={`/api/Image/PreviewImage?postId=${post.blogPostId}`}
                alt={post.title}
                sx={styles.image}
              />
              <Box sx={styles.authorBadge}>
                {post.user}
              </Box>

              {user &&
                (post.isFeatured ? (
                  <Box title="Featured post">
                    <GradeRoundedIcon sx={{ ...styles.featuredIcon, ...styles.featuredIconHover }} />
                  </Box>
                ) : (
                  <Box title="Make featured" onClick={openFeatureWindow}>
                    <StarOutlineRoundedIcon sx={{ ...styles.featuredIcon, ...styles.makeFeaturedIcon }} />
                  </Box>
                ))}
            </Box>
          </Box>
        </Stack>
      </Grid>
      <Divider />
    </Box>
  );
}

export default HomePost;
