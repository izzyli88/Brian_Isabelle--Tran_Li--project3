import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);

  async function retrieveUserData() {
    const response = await axios.get("/api/user/isLoggedIn");
    const username = response.data.username || null;
    setUser(username);
  }

  useEffect(() => {
    retrieveUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, retrieveUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}