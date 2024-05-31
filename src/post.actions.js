export async function createPost(
  title,
  content,
  backgroundImage,
  previewImage,
  backgroundImageFormat,
  previewImageFormat,
  token
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
  const json = await response.json();
  return json;
}

export async function fetchPageCount() {
  const response = await fetch("/api/blogpost/getpagecount");
  const json = await response.json();
  return json;
}

export async function fetchPost(postId) {
  const response = await fetch(`/api/blogpost/getpost?postId=${postId}`);
  const json = await response.json();
  return json;
}

export async function updatePost(
  id,
  title,
  content,
  backgroundImage,
  previewImage,
  backgroundImageFormat,
  previewImageFormat,
  token
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
  return await response.json();
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
  return await response.json();
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
    }
  );
  const json = await response.json();
  return json;
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
  const json = await response.json();
  return json;
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
  return await response.json();
}
