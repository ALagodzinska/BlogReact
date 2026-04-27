import { Box } from "@mui/material";
import { IMAGE_TYPE } from "../constants";

function FormImageDisplay({ imgSrc, clearImageHandler, imgType }) {
  const isBackgroundImage = imgType === IMAGE_TYPE.BACKGROUND;

  return (
    <Box>
      <Box sx={{ pt: 3 }}>
        <img
          alt="not found"
          style={{
            display: "block",
            width: isBackgroundImage ? "100%" : "auto",
            maxWidth: "100%",
            maxHeight: isBackgroundImage ? "90px" : "80px",
            objectFit: "contain",
          }}
          src={imgSrc}
        />
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

export default FormImageDisplay;
