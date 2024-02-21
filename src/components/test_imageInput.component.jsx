import { Box, Typography } from "@mui/material";
import { useRef } from "react";

function ImageInput({ title, setSelectedImage, selectedImage, error }) {
  const inputRef = useRef(null);

  const imageSelectedHandler = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const clearImageHandler = (event) => {
    event.preventDefault();
    inputRef.current.value = "";
    setSelectedImage(null);
  };

  return (
    <Box>
      <Typography sx={{ pb: 2 }}>{title}</Typography>
      <input
        type="file"
        ref={inputRef}
        multiple={false}
        accept="image/"
        onChange={imageSelectedHandler}
      />
      {error && (
        <Typography variant="caption" color={"red"} sx={{ display: "flex" }}>
          {error}
        </Typography>
      )}
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
