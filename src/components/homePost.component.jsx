import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/user.context";
import DeletePopup from "./popups/deletePopup.component";
import { truncate } from "../services/postService";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import FeaturePopup from "./popups/featurePopup.component";
import styles from "../styles/components/homePost.styles";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

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

  const formattedDate = new Date(post.creationDate).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

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
          <Stack sx={styles.mainRow}>
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
                dangerouslySetInnerHTML={{
                  __html: truncate(post.content, 400),
                }}
              />
            </Box>
            <Box sx={styles.imageColumn}>
              <Box sx={styles.imageFrame}>
                <Box
                  component="img"
                  src={`/api/Image/PreviewImage?postId=${post.blogPostId}`}
                  alt={post.title}
                  sx={styles.image}
                />
                <Box sx={styles.authorBadge}>{post.user}</Box>

                {user &&
                  (post.isFeatured ? (
                    <Box title="Featured post" sx={styles.featuredBadge}>
                      <GradeRoundedIcon sx={styles.featuredBadgeIcon} />
                      Featured
                    </Box>
                  ) : (
                    <Button
                      title="Make featured"
                      onClick={openFeatureWindow}
                      variant="contained"
                      startIcon={
                        <StarOutlineRoundedIcon sx={styles.featureButtonIcon} />
                      }
                      sx={styles.featureButton}
                    >
                      Feature
                    </Button>
                  ))}
              </Box>
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center" sx={styles.actionRow}>
            <Button
              variant="contained"
              component={Link}
              to={`/${post.blogPostId}`}
              sx={styles.readMoreButton}
            >
              Read More
            </Button>
            {user && (
              <Stack
                direction="row"
                alignItems="center"
                sx={styles.adminActionGroup}
              >
                <Button
                  component={Link}
                  to={`/edit/${post.blogPostId}`}
                  variant="outlined"
                  startIcon={<EditOutlinedIcon sx={styles.adminActionIcon} />}
                  sx={styles.actionButton}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={openDeleteWindow}
                  startIcon={
                    <DeleteOutlineRoundedIcon sx={styles.adminActionIcon} />
                  }
                  sx={styles.deleteButton}
                >
                  Delete
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Grid>
      <Divider />
    </Box>
  );
}

export default HomePost;
