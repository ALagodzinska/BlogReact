import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { truncate } from "../post.actions";

function RecentPosts({ posts }) {
  return (
    <Box
      sx={{
        border: 1,
        p: 3,
        mb: 2,
        borderRadius: "10px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" mb={2}>
          Latest Posts
        </Typography>
        <Box>
          <Link to={"/"}>See all...</Link>
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={2}
      >
        {posts.map((post) => (
          <Stack
            key={post.blogPostId}
            border={1}
            p={2}
            component={Link}
            to={`/${post.blogPostId}`}
            sx={{
              width: "25%",
              textDecoration: "none",
              cursor: "pointer",
              color: "inherit",
            }}
          >
            <Box
              sx={{
                width: "125px",
                height: "150px",
                outline: "1px solid",
                textAlign: "center",
                borderRadius: "10%",
              }}
            >
              <img
                src={`/api/Image/PreviewImage?postId=${post.blogPostId}`}
                alt="preview"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  borderRadius: "10%",
                }}
              />
            </Box>
            <Box
              sx={{
                mt: 2,
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: truncate(post.title, 15),
                }}
              ></div>
            </Box>
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              {new Date(post.creationDate).toLocaleDateString()}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
export default RecentPosts;
