import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Header from "./header.component";
import ImageInput from "./imageInput.component";
import ReactQuill, { Quill } from "react-quill";
import { FORM_TYPE, IMAGE_TYPE } from "../constants";
import FormImageDisplay from "./formImageDisplay.component";
import ImageResize from "quill-image-resize-module-react";
import { Link } from "react-router-dom";

Quill.register("modules/imageResize", ImageResize);

const toolbarOptions = {
  container: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // toggled button
    ["bold", "italic", "underline"],
    [{ align: [] }],
    ["image"],

    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],

    ["clean"], // remove formatting button
  ],
};

function PostForm({
  handleSubmit,
  inputFields,
  setInputFields,
  errors,
  loading,
  formType,
}) {
  // FOR FUTURE - can make one method HANDLE FIELD CHANGE and pass Key and value( for objects can use ....["key"])
  const handleTitleChange = (event) => {
    setInputFields((inputFields) => {
      return { ...inputFields, title: event.target.value };
    });
    if (errors.title) delete errors.title;
  };

  const handleBackgroundImgChange = (img, imgPreview) => {
    setInputFields((inputFields) => {
      return {
        ...inputFields,
        backgroundImg: img,
        backgroundImgPreview: imgPreview,
      };
    });
    if (errors.backgroundImg) delete errors.backgroundImg;
  };

  const handlePreviewImgChange = (img, imgPreview) => {
    setInputFields((inputFields) => {
      return { ...inputFields, previewImg: img, previewImgPreview: imgPreview };
    });
    if (errors.previewImg) delete errors.previewImg;
  };

  const handleContentChange = (content) => {
    setInputFields((inputFields) => {
      return { ...inputFields, content: content };
    });
    if (errors.content) delete errors.content;
  };

  const clearPreviewImageHandler = (event) => {
    event.preventDefault();
    setInputFields((inputFields) => {
      return { ...inputFields, previewImgLink: null };
    });
  };
  const clearBackgroundImageHandler = (event) => {
    event.preventDefault();
    setInputFields((inputFields) => {
      return { ...inputFields, backgroundImgLink: null };
    });
  };

  return (
    <Container
      sx={{
        mt: 3,
      }}
    >
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {/*loading === LOADING_STATES.success && (
            <Typography color={"green"} align="center">
              Successfully submitted ✓
            </Typography>
          )}
          {loading === LOADING_STATES.failure && (
            <Typography color={"red"} align="center">
              Failed to save the post X
            </Typography>
          )*/}
          <TextField
            id="title"
            sx={{ pb: 3 }}
            label="Blog Title"
            name="title"
            value={inputFields.title}
            onChange={handleTitleChange}
            error={!!errors.title}
            helperText={errors.title}
          />
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
            pb={2}
          >
            <Box>
              {inputFields.backgroundImgLink ? (
                <Box>
                  <Typography>Background Image</Typography>
                  <FormImageDisplay
                    imgSrc={inputFields.backgroundImgLink}
                    clearImageHandler={clearBackgroundImageHandler}
                    imgType={IMAGE_TYPE.BACKGROUND}
                  />
                </Box>
              ) : (
                <ImageInput
                  title="Background Image"
                  setSelectedImage={handleBackgroundImgChange}
                  error={errors.backgroundImg}
                  selectedImage={inputFields.backgroundImg}
                  previewImg={inputFields.backgroundImgPreview}
                  imageType={IMAGE_TYPE.BACKGROUND}
                />
              )}
            </Box>
            <Box>
              {inputFields.previewImgLink ? (
                <Box>
                  <Typography>Preview Image</Typography>
                  <FormImageDisplay
                    imgSrc={inputFields.previewImgLink}
                    clearImageHandler={clearPreviewImageHandler}
                    imgType={IMAGE_TYPE.PREVIEW}
                  />
                </Box>
              ) : (
                <ImageInput
                  title="Preview Image"
                  setSelectedImage={handlePreviewImgChange}
                  error={errors.previewImg}
                  selectedImage={inputFields.previewImg}
                  previewImg={inputFields.previewImgPreview}
                  imageType={IMAGE_TYPE.PREVIEW}
                />
              )}
            </Box>
          </Stack>

          <ReactQuill
            theme="snow"
            value={inputFields.content}
            onChange={handleContentChange}
            modules={{
              toolbar: toolbarOptions,
              imageResize: {
                parchment: Quill.import("parchment"),
                modules: ["Resize", "DisplaySize"],
              },
            }}
          />
          {errors.content && (
            <Typography color="red" fontSize={12}>
              {errors.content}
            </Typography>
          )}

          <Button
            variant="outlined"
            sx={{ mt: 7 }}
            type="submit"
            disabled={loading}
          >
            SAVE
          </Button>
        </Stack>
      </form>
      <Button
        component={Link}
        to="/"
        color="secondary"
        size="medium"
        variant="outlined"
        sx={{ px: 5, ml: 5, my: 3 }}
      >
        Go Back
      </Button>
    </Container>
  );
}

export default PostForm;
