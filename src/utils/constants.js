// ERROR MESSAGE CONSTANTS
export const EMAIL_ERROR_MESSAGE = "Email is required";
export const PASSWORD_ERROR_MESSAGE = "Password is required";
export const TITLE_ERROR_MESSAGE = "Title is required";
export const CONTENT_ERROR_MESSAGE = "Content is required";
export const PREVIEW_IMG_ERROR_MESSAGE = "Preview image is required";
export const BACKGROUND_IMG_ERROR_MESSAGE = "Background image is required";
// LOADING ERROR MESSAGES
export const PAGE_NOT_FOUND_ERROR =
  "Oops! The page you’re looking for doesn’t exist. Please check the URL and try again.";
export const INTERNAL_SERVER_ERROR =
  "Something went wrong on our end. Please try again later.";
export const FORBIDDEN_ERROR =
  "You don’t have permission to access this page. Please check your credentials.";
export const UNAUTHORIZED_ERROR =
  "You need to be logged in to access this page. Please log in or sign up to continue.";
export const BAD_REQUEST_ERROR =
  "There was an error with your request. Please check the input and try again.";
export const SERVICE_UNAVAILABLE_ERROR =
  "Our service is currently unavailable. Please try again later.";
export const TIMEOUT_ERROR =
  "Your request took too long to process. Please try again.";
export const FORM_SUBMISSION_ERROR =
  "There was an error submitting the form. Please check the information and try again.";
export const FILE_UPLOAD_ERROR =
  "There was an issue uploading your file. Please ensure it meets the required format and size.";
export const POST_LOADING_ERROR =
  "Wasn't able to load a post. Please go back to the main page.";
export const RESTORE_LIST_ERROR =
  "Wasn't able to load a posts to restore. Please go back to the main page.";
export const POSTS_LIST_ERROR =
  "Wasn't able to load a posts. Please refresh the page.";
export const DELETE_ERROR =
  "Wasn't able to delete a post. Please go back to the main page and try again.";
export const RESTORE_ERROR =
  "Wasn't able to restore a post. Please refresh the page and try again.";
export const FEATURE_ERROR =
  "Wasn't able to restore a post. Please refresh the page and try again.";
// LOADING SUCCESS MESSAGES
export const EDIT_SUCCESSFUL_MESSAGE =
  "Post was successfully updated! You will be redirected to the home page within 3 seconds.";
export const CREATE_SUCCESSFUL_MESSAGE =
  "Post was successfully created! You will be redirected to the home page within 3 seconds.";
export const DELETE_SUCCESSFUL_MESSAGE =
  "Post was successfully deleted! You will be redirected to the home page within 3 seconds";
export const RESTORE_SUCCESSFUL_MESSAGE =
  "Post was successfully restored! You may find it in the list of all existing posts.";
export const FEATURE_SUCCESSFUL_MESSAGE =
  "Post was successfully featured! You may find it on the main page.";

// FORM TYPES
export const FORM_TYPE = {
  CREATE: "create",
  UPDATE: "update",
};
// IMAGE TYPES
export const IMAGE_TYPE = {
  PREVIEW: "preview",
  BACKGROUND: "background",
};
// ALERT MESSAGE TYPES
export const ALERT_MESSAGE_TYPE = {
  ERROR: "error",
  SUCCESS: "success",
};
// POPUP TYPES
export const POPUP_TYPE = {
  RESTORE: "RESTORE",
  DELETE: "DELETE",
  FEATURE: "FEATURE",
};
// NUMBER CONSTANTS
export const POSTS_PER_PAGE = 5;
export const RECENT_POSTS_PER_PAGE = 4;
