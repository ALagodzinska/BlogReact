import { createContext, useEffect, useState } from "react";
import { getValidUser } from "./user.actions";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const localStorageUser = await getValidUser();
        setUser(localStorageUser);
        if (!localStorageUser) window.localStorage.clear();
      } catch (error) {
        console.error(error);
        setUser(null);
        window.localStorage.clear();
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
