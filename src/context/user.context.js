import { createContext, useEffect, useState } from "react";
import { getValidUser, validateUser } from "../services/userService";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await validateUser(setUser);
        const localStorageUser = await getValidUser();
        setUser(localStorageUser);
        if (!localStorageUser) {
          window.localStorage.removeItem("user");
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setUser(null);
        window.localStorage.removeItem("user");
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser, loading]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
