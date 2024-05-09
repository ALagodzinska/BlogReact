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
import ReactQuill from "react-quill";
import { FORM_TYPE, IMAGE_TYPE, LOADING_STATES } from "../constants";
import FormImageDisplay from "./formImageDisplay.component";

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
    <Container>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Header
            title={
              formType === FORM_TYPE.CREATE ? "CREATE NEW POST" : "EDIT POST"
            }
          />
          {loading === LOADING_STATES.success && (
            <Typography color={"green"} align="center">
              Successfully submitted ✓
            </Typography>
          )}
          {loading === LOADING_STATES.failure && (
            <Typography color={"red"} align="center">
              Failed to save the post X
            </Typography>
          )}
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
            disabled={loading === LOADING_STATES.success}
          >
            SAVE
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default PostForm;
