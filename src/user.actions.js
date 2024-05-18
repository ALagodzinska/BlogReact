async function loginUser(email, password) {
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
  }
}

export function logoutUser() {
  window.localStorage.clear();
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
  if (response.status === 200) return await response.json();
  else {
    if (response.status === 401) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  }
}

export async function getLoggedInUser(email, password) {
  try {
    const response = await loginUser(email, password);
    const username = await getUsername(response.accessToken);

    const userObject = {
      username: username,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
    setUserInLocalStorage(userObject);

    return userObject;
  } catch (error) {
    throw new Error(error);
  }
}

function setUserInLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage() {
  let user = window.localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export async function getValidUser() {
  try {
    const localStorageUser = getUserFromLocalStorage();
    if (localStorageUser) {
      const loggedInUserName = await getUsername(localStorageUser.accessToken);
      if (loggedInUserName === localStorageUser.username)
        return localStorageUser;
      else throw new Error("Invalid user data in local storage");
    }
    return null;
  } catch (error) {
    throw new Error(error);
  }
}

export async function validateUser() {
  const localStorageUser = getUserFromLocalStorage();
  if (localStorageUser) {
    try {
      await getUsername(localStorageUser.accessToken);
    } catch (error) {
      console.log("REFRESH TOKEN");
      const response = await refreshToken(localStorageUser.refreshToken);
      const userObject = {
        username: localStorageUser.username,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };
      setUserInLocalStorage(userObject);
    }
  }
}

async function refreshToken(refreshToken) {
  const response = await fetch("/refresh", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });
  if (response.status === 200) return await response.json();
  else {
    if (response.status === 401) {
      throw new Error(
        `User does not exist. Request failed with status ${response.status}`
      );
    }
  }
}
