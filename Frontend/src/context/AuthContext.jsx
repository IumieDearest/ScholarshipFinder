import { createContext, useState } from "react";

// Create the context object (this is what other files import)
export const AuthContext = createContext(null);

// Create the Provider — wrap your whole app in this so every
//    component can read the user from anywhere
export const AuthProvider = ({ children }) => {
  // user = null means "nobody is logged in"
  // user = { role: "student", name: "..." } means someone is logged in
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};