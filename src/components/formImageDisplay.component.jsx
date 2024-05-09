import { Box } from "@mui/material";
import { IMAGE_TYPE } from "../constants";

function FormImageDisplay({ imgSrc, clearImageHandler, imgType }) {
  return (
    <Box>
      <Box sx={{ pt: 3 }}>
        <img
          alt="not found"
          width={imgType === IMAGE_TYPE.BACKGROUND ? "350px" : null}
          height={imgType === IMAGE_TYPE.PREVIEW ? "80px" : null}
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
