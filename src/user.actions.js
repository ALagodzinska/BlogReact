async function loginUser(email, password) {
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 200) return await response.json();
    else {
      if (response.status === 401) {
        throw new Error(
          `User does not exist. Request failed with status ${response.status}`
        );
      }
      return null;
    }
  } catch (error) {
    console.error("Login User", error);
    return null;
  }
}

export async function getUsername(token) {
  try {
    const response = await fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) return await response.json();
    else {
      if (response.status === 401) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return null;
    }
  } catch (error) {
    console.error("User From Local Storage", error);
    return null;
  }
}

export async function getLoggedInUser(email, password) {
  const response = await loginUser(email, password);
  if (!response) return null;

  const username = await getUsername(response.accessToken);
  if (!username) return null;

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
  return user ? JSON.parse(user) : null;
}

export async function getValidUser() {
  const localStorageUser = getUserFromLocalStorage();
  if (localStorageUser) {
    const loggedInUserName = await getUsername(localStorageUser.accessToken);
    if (loggedInUserName === localStorageUser.username) return localStorageUser;
  }
  return null;
}
