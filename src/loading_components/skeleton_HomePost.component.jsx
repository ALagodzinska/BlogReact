import { Box, Grid, Skeleton, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
function SkeletonHomePost() {
  return (
    <Box>
      <Grid item xs={12} md={8} pb={3}>
        <Stack direction="row">
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="rectangular" width={"80%"} height={"40px"} />
            <br />
            <Skeleton variant="rectangular" width={"80%"} height={"200px"} />
          </Box>
          <Box>
            <Skeleton variant="rectangular" height={"300px"} width={"250px"} />
          </Box>
        </Stack>
      </Grid>
      <Divider />
    </Box>
  );
}

export default SkeletonHomePost;
