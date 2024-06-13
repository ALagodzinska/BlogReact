import { createContext, useEffect, useState } from "react";
import { getValidUser, validateUser } from "./user.actions";

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
        if (!localStorageUser) window.localStorage.clear();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("YOU ARE LOGGED OUT JUST BECAUSE!");
        console.error(error);
        setUser(null);
        window.localStorage.clear();
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
