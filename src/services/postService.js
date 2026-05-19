export async function createPost(
  title,
  content,
  backgroundImage,
  previewImage,
  backgroundImageFormat,
  previewImageFormat,
  token,
) {
  const response = await fetch("/api/blogpost/postblog", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      content,
      backgroundImage,
      previewImage,
      backgroundImageFormat,
      previewImageFormat,
    }),
  });
  return await response.json();
}

export async function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      resolve(btoa(reader.result));
    };
    reader.onerror = reject;
  });
}

export async function fetchPosts(pageNum) {
  const response = await fetch(`/api/blogpost/getpostsforpage?page=${pageNum}`);
  return response.json();
}

export async function fetchPageCount() {
  const response = await fetch("/api/blogpost/getpagecount");
  return response.json();
}

export async function fetchPost(postId) {
  const response = await fetch(`/api/blogpost/getpost?postId=${postId}`);
  return response.json();
}

export async function updatePost(
  id,
  title,
  content,
  backgroundImage,
  previewImage,
  backgroundImageFormat,
  previewImageFormat,
  token,
) {
  const response = await fetch(`/api/blogpost/updatepost?postId=${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      content,
      backgroundImage,
      previewImage,
      backgroundImageFormat,
      previewImageFormat,
    }),
  });
  return response.json();
}

export async function increaseNumberOfLikes(id) {
  const response = await fetch(`/api/BlogPost/IncrementLike?postId=${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function deletePost(id, token) {
  const response = await fetch(`/api/blogpost/deletePost?postId=${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function fetchDeletedPosts(pageNum, token) {
  const response = await fetch(
    `/api/blogpost/getdeletedpostsperpage?page=${pageNum}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
}

export async function fetchDeletedPostsPageCount(token) {
  const response = await fetch("/api/blogpost/getdeletedpostspagecount", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function restorePost(id, token) {
  const response = await fetch(`/api/blogpost/restorePost?postId=${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

// FEATURED POSTS
export async function fetchFeaturedPost() {
  const response = await fetch(`/api/blogpost/getFeaturedPost`);
  return response.json();
}

export async function fetchLatestPosts() {
  const response = await fetch(`/api/blogpost/getLatestPosts`);
  return response.json();
}

export async function featurePost(id, token) {
  const response = await fetch(`/api/blogpost/featurePost?postId=${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

export function getLikesFromLocalStorage() {
  var item = window.localStorage.getItem("likes");

  if (item === null || !item) {
    window.localStorage.setItem("likes", JSON.stringify([]));
  } else {
    var array = JSON.parse(item);
    return array;
  }

  return [];
}

export function checkIfPostIsLiked(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (String(array[i]) === String(id)) {
      return true;
    }
  }

  return false;
}

export function addLikeToLocalStorage(array, id) {
  var updatedLikes = [...array, id];
  window.localStorage.setItem("likes", JSON.stringify(updatedLikes));

  return updatedLikes;
}

export async function incrementNumberOfViews(id) {
  const response = await fetch(
    `/api/blogpost/incrementViewCount?postId=${id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  return response.json();
}

export function getViewsFromLocalStorage() {
  var views = window.localStorage.getItem("views");

  if (views === null || !views) {
    window.localStorage.setItem("views", JSON.stringify([]));
  } else {
    return JSON.parse(views);
  }

  return [];
}

export function checkIfPostIsViewed(arrayOfIds, postId) {
  for (var i = 0; i < arrayOfIds.length; i++) {
    if (String(arrayOfIds[i]) === String(postId)) {
      return true;
    }
  }

  return false;
}

export function addViewsToLocalStorage(array, id) {
  if (checkIfPostIsViewed(array, id)) {
    return array;
  }

  var updatedViews = [...array, id];
  window.localStorage.setItem("views", JSON.stringify(updatedViews));

  return updatedViews;
}

export function removeViewFromLocalStorage(id) {
  var updatedViews = getViewsFromLocalStorage().filter(
    (viewedPostId) => String(viewedPostId) !== String(id),
  );

  window.localStorage.setItem("views", JSON.stringify(updatedViews));

  return updatedViews;
}
