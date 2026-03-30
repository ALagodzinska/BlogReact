import { Box, Button, Grid, Link, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useContext, useState } from "react";
import UserContext from "../user.context";
import DeletePopup from "./deletePopup.component";
import { truncate } from "../post.actions";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import FeaturePopup from "./featurePopup.component";

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
      <Grid item xs={12} md={8} pb={3}>
        <Stack direction="row">
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              {new Date(post.creationDate).toLocaleDateString()}
            </Typography>
            <br />
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              {post.user}
            </Typography>
            <div
              dangerouslySetInnerHTML={{ __html: truncate(post.content, 450) }}
            ></div>
            <Link href={post.blogPostId}>Read More...</Link>
            <Box>
              {user && <Link href={`/edit/${post.blogPostId}`}>Edit</Link>}
            </Box>
            <Box>
              {user && (
                <Link href={"#"} onClick={openDeleteWindow}>
                  Delete
                </Link>
              )}
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                width: "250px",
                height: "300px",
                outline: "5px solid black",
                textAlign: "center",
                position: "relative",
              }}
            >
              <img
                src={`/api/Image/PreviewImage?postId=${post.blogPostId}`}
                alt="preview"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />

              {user &&
                (post.isFeatured ? (
                  <Box title="Featured post">
                    <GradeRoundedIcon
                      sx={{
                        position: "absolute",
                        fontSize: 40,
                        top: 0,
                        right: 0,
                        color: "orange",
                        ":hover": {
                          transform: "scale(1.3)",
                        },
                        WebkitTransition: "transform 0.3s ease-in-out",
                      }}
                    />
                  </Box>
                ) : (
                  <Box title="Make featured" onClick={openFeatureWindow}>
                    <StarOutlineRoundedIcon
                      sx={{
                        position: "absolute",
                        fontSize: 40,
                        top: 0,
                        right: 0,
                        cursor: "pointer",
                        color: "orange",
                        ":hover": {
                          transform: "scale(1.4)",
                        },
                        WebkitTransition: "transform 0.3s ease-in-out",
                      }}
                    />
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
