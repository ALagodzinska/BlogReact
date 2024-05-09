import { Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import FormImageDisplay from "./formImageDisplay.component";
import { fetchBackgroundImage } from "../image.actions";
import { getBase64 } from "../post.actions";

function ImageInput({
  title,
  setSelectedImage,
  selectedImage,
  error,
  previewImg,
  imageType,
}) {
  const inputRef = useRef(null);

  const imageSelectedHandler = async (event) => {
    const uploadedImage = event.target.files[0];
    const imageString = await getBase64(uploadedImage);
    const resizedImage = await fetchBackgroundImage(
      imageString,
      uploadedImage.type,
      imageType
    );
    setSelectedImage(uploadedImage, resizedImage);
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
        <FormImageDisplay
          imgSrc={previewImg}
          clearImageHandler={clearImageHandler}
        />
      )}
    </Box>
  );
}

export default ImageInput;
