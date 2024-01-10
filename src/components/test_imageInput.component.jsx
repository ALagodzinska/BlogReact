import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRef } from "react";

function ImageInput({ title, onImageChange }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);

  const imageSelectedHandler = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const clearImageHandler = (event) => {
    event.preventDefault();
    inputRef.current.value = "";
    setSelectedImage(null);
  };

  useEffect(() => {
    onImageChange(selectedImage);
  }, [onImageChange, selectedImage]);

  return (
    <Box>
      <Typography sx={{ pb: 2 }}>{title}</Typography>
      <input
        type="file"
        ref={inputRef}
        onChange={imageSelectedHandler}
      />
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
