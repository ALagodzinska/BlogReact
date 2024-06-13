import { Box, Container, Grid, Skeleton, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import { RECENT_POSTS_PER_PAGE } from "../constants";
import SkeletonRecentPost from "./skeleton_RecentPosts.component";

function SkeletonFeaturedPost() {
  return (
    <Grid item xs={12} md={8} pb={3} mt={5}>
      <Stack direction="row">
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton
            variant="rectangular"
            width={"20%"}
            height={"15px"}
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width={"80%"}
            height={"45px"}
            sx={{ mb: 4 }}
          />
          <Skeleton
            variant="rectangular"
            width={"90%"}
            height={"230px"}
            sx={{ mb: 2 }}
          />
          <Skeleton variant="rectangular" height={"20px"} width={"30%"} />
        </Box>
        <Box>
          <Skeleton variant="rounded" height={"350px"} width={"450px"} />
          <Skeleton
            sx={{ mt: 1, float: "right", display: "flex" }}
            width={"20%"}
            height={"20px"}
          />
        </Box>
      </Stack>
      <Box
        sx={{
          p: 3,
          mb: 2,
          mt: 3,
          borderRadius: "10px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Skeleton
            variant="rectangular"
            height={"30px"}
            width={"10%"}
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={"15px"}
            width={"10%"}
            sx={{ mb: 2 }}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="flex-start"
          spacing={2}
        >
          {Array.from(new Array(RECENT_POSTS_PER_PAGE)).map((el, index) => (
            <SkeletonRecentPost key={index} />
          ))}
        </Stack>
      </Box>
    </Grid>
  );
}

export default SkeletonFeaturedPost;
