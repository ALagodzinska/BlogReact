import { Skeleton, Stack } from "@mui/material";

function SkeletonRecentPost() {
  return (
    <Stack p={2} sx={{ width: "25%" }}>
      <Skeleton
        variant="rounded"
        height={"150px"}
        width={"125px"}
        sx={{ mb: 2 }}
      />
      <Skeleton
        variant="rectangular"
        height={"20px"}
        width={"95%"}
        sx={{ mb: 2 }}
      />
      <Skeleton variant="rectangular" width={"20%"} height={"15px"} />
    </Stack>
  );
}

export default SkeletonRecentPost;
