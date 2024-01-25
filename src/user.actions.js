async function loginUser(email, password) {
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
}

export async function getUsername(token) {
  const response = await fetch("/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function getLoggedInUser(email, password) {
  const response = await loginUser(email, password);
  if (response.status === 401) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const username = await getUsername(response.accessToken);
  if (username.status === 401) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const userObject = {
    username: username,
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  };
  window.localStorage.setItem("user", JSON.stringify(userObject));
  return userObject;
}

export function getUserFromLocalStorage() {
  let user = window.localStorage.getItem("user");
  return user ? JSON.parse(user) : user;
}

export async function getValidUser() {
  const localStorageUser = getUserFromLocalStorage();
  if (localStorageUser) {
    const loggedInUserName = await getUsername(localStorageUser.accessToken);
    if (loggedInUserName === localStorageUser.username) return localStorageUser;
  }
  return null;
}
