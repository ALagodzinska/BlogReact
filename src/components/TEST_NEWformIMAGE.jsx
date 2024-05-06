import { Box } from "@mui/material";

function TESTFormImageDisplay({ imgSrc, clearImageHandler }) {
  return (
    <Box>
      <Box sx={{ pt: 3 }}>
        <img alt="not found" height={"250px"} src={imgSrc} />
      </Box>
      <button
        onClick={(event) => {
          clearImageHandler(event);
        }}
      >
        Remove
      </button>
    </Box>
  );
}

export default TESTFormImageDisplay;
