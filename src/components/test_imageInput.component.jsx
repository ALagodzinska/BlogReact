import { Box, Typography } from "@mui/material";
import { useState } from "react";

function ImageInput(title) {
  const [selectedImage, setSelectedImage] = useState(null);

  const imageSelectedHandler = (event) => {
    setSelectedImage(null);
    setSelectedImage(event.target.files[0]);
  };

  const clearImageHandler = (event) => {
    event.preventDefault();
    document.getElementById(title).value = "";
    setSelectedImage(null);
  };

  return (
    <Box>
      <Typography sx={{ pb: 2 }}>{title}</Typography>
      <input type="file" id={title} onChange={imageSelectedHandler} />
      {selectedImage && (
        <Box>
          <Box sx={{ pt: 3 }}>
            <img
              alt="not found"
              height={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
          </Box>
          <button onClick={clearImageHandler}>Remove</button>
        </Box>
      )}
    </Box>
  );
}

export default ImageInput;
