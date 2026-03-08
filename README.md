# Blog Website

<img width="419" height="448" alt="blog" src="https://github.com/user-attachments/assets/04e09c90-f429-480b-9ee4-f59c78ec7895" />

## Overview
This project is a full-stack blog platform built with a **.NET Web API backend** and a **React frontend**.  
The application allows visitors to browse blog posts while an authenticated admin user can manage the blog content.

The React frontend communicates with the backend through HTTP requests to retrieve and update blog data.  
The backend handles data storage, authentication, and business logic, while the frontend focuses on presenting content and user interaction.

Admin functionality includes:
- Creating new blog posts
- Editing existing posts (text and images)
- Deleting posts
- Restoring deleted posts
- Marking posts as **featured**, which changes how they are displayed on the main blog page
## Technologies
**Backend**
- ASP.NET Core Web API
- C#
- SQL Server
**Frontend**
- React
- JavaScript
**Other**
- HTTP requests for API communication
- Bitmap image processing for handling uploaded images

## Key Features
- Full CRUD operations for blog posts
- Admin authentication
- Featured post highlighting
- Image upload support
- Automatic image resizing and cropping for consistent display
- Soft delete and restore functionality for posts

## Image Handling
Each blog post requires two different images:
- A **preview image** used on the blog list page
- A **background image** used on the full post page
Since uploaded images can have different sizes and aspect ratios, the application processes images by:
1. Resizing them proportionally
2. Cropping them from the center to match the required dimensions
3. Storing the processed images in the database
This ensures images display consistently across the website regardless of the original image size.

# Personal Notes
## Page navigation in React

For navigation between pages use " import { useNavigate } from "react-router-dom"; "
Add to your React component - " const navigate = useNavigate(); "
Then in needed places use " navigate("/path") "

## POST request

Use async function outside component with fetch.

```javascript
const response = await fetch("/api/blogpost", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    param1,
    param2,
  }),
});
return await response.json();
```

Use without await in react component

## IF NEXT VALUE DEPENDS ON A PREVIOUS VALUE IN SET STATE

INSTEAD SetValue(value);
DO THIS:

```javascript
setInputFields((inputFields) => {
  return { ...inputFields, content: content };
});
```
